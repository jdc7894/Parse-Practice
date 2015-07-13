var requiredErrors = [];
var typeErrors = [];

/* 
  This function gets automatically called by Parse when Parse User object is saved. 
  Below is the full Data Model for User object. 
   ****************************************************
   * username                  (required)             *
   * password                  (required)             *
   * email                     (required)             *
   * firstname : string        (required)             *
   * lastname  : string        (required)             *
   * registeredFromGame : enum (required)             *
   * dob       : datetime      (required)             *
   * country   : enum          (required)             *
   * gender    : enum                                 *
   * isSubscribedToNewsletter : true|false (required) *
   * platformXBoxAccountId    : string                *
   * platformPs4AccountId     : string                *
   * platformSteamAccountId   : string                *
   ****************************************************

   The input checks are cosisted of 2 types of test. 
   1. Required fields check. Check that all the required fields are provided.  
   2. Type check. If all the required fields are provided, make sure that the input is valid type. Note that this check will not be performed if at least one of the required fields is empty.  
*/
Parse.Cloud.beforeSave(Parse.User, function(request, response) {
    var genderEnum = ["Male", "Female"];
    var genderType = request.object.get("gender"); 
    var registeredFromGameEnum = ["HFTR"];
    var registeredFromGame = request.object.get("registeredFromGame");
    var countryEnum = createCountryEnum();
    var countryCode = request.object.get("country");
    var errorMessage = "";
    var errors = [];                          // contains list of input fields that are invalid  
    var isInvalidRequiredInput = false;               // will set to true if at least one input field is invalid  
    var isInvalidTypeInput = false; 

    /* Required fields check. Make sure that the input value exists. */
    if(!request.object.get("username"))       
    { 
        requiredErrors.push("username");
        isInvalidRequiredInput = true; 
    } 
    if(!request.object.get("email")) 
    {
        requiredErrors.push("email");
        isInvalidRequiredInput = true; 
    } 
    if(!request.object.get("firstname"))       
    { 
        requiredErrors.push("firstname");
        isInvalidRequiredInput = true; 
    } 
    if(!request.object.get("lastname"))       
    { 
        requiredErrors.push("lastname");
        isInvalidRequiredInput = true; 
    } 
    if(typeof request.object.get("dob") === 'undefined')
    {
        requiredErrors.push("dob");
        isInvalidRequiredInput = true; 
    }
    if(typeof request.object.get("isSubscribedToNewsletter") === 'undefined')    // not selected true/false value 
    {
        requiredErrors.push("subscription preference");
        isInvalidRequiredInput = true; 
    }
    if(typeof countryCode === 'undefined')
    {
        requiredErrors.push("country code");
        isInvalidRequiredInput = true; 
    }
    if(typeof registeredFromGame === 'undefined')
    {
        requiredErrors.push("registeredFromGame");
        isInvalidRequiredInput = true; 
    }

    /* Type check. If all the required fields are provided, check they are valid types. */
    if(!isInvalidRequiredInput)                 // all the required fields are provided
    {
        /* Check for Date type. */
        if(!(request.object.get("dob") instanceof Date))
        {
            typeErrors.push("date of birth");
            isInvalidTypeInput = true; 
        }

        /* Check for Enum String. Make sure that the input value exactly match one of the Enum values. */
        if(countryEnum.indexOf(countryCode) == -1)                // this country code does not exist in country code enum 
        {
            typeErrors.push("country code"); 
            isInvalidTypeInput = true; 
        }
        if(typeof genderType !== 'undefined')                     // this Enum is only enforced if input is provided because this field is not. 
        {
            if(genderEnum.indexOf(genderType) == -1)                                    // if the input type does not belong ot typeEnum
            {
                typeErrors.push("gender");
                isInvalidTypeInput = true; 
            }
        }
        if(registeredFromGameEnum.indexOf(registeredFromGame) == -1)         // should be 'HFTR'
        {
            typeErrors.push("registeredFromGame");
            isInvalidTypeInput = true; 
        }
    }
  
    /* Returns success/failure response */ 
    if(isInvalidRequiredInput || isInvalidTypeInput)      // return with error message, user object will not be saved to Parse. 
    {
        errorMessage = generateErrorMessage(requiredErrors,typeErrors);
        response.error(errorMessage);
    }
    else                    // no error was found, user object will be saved successfully.
    {
        response.success();
    }
    
});

/* 
  This function gets automatically called by Parse when HFTRAward object is saved.
  Below is the full data model for User object. 
   ********************************
   * type                         *
   * name (TBD)                   *
   * description (TBD)            *
   * image                        *
   * imageThumb                   *
   * dateActivated   (required)   *
   * dateDeactivated              *
   ********************************

   The input checks are cosisted of 2 types of test. 
   1. Required fields check. Check that all the required fields are provided.  
   2. Type check. If all the required fields are provided, make sure that the input is valid type. Note that this check will not be performed if at least one of the required fields is empty.  
*/
Parse.Cloud.beforeSave("HFTRAward", function(request, response) {
    var errorMessage = "";
    var errors = [];  
    var isInvalidRequiredInput = false;               // will set to true if at least one input field is invalid  
    var isInvalidTypeInput = false;

    /* name is likely to be not removed from this Data Model. TBD */
    // if(!request.object.get("name"))
    // {
    //   errors.push("name");
    //   isInvalidInput = true; 
    // }

    /* Required fields check. Make sure that the input value exists. */
    if(typeof request.object.get("dateActivated") === 'undefined')
    {
        requiredErrors.push("dateActivated");
        isInvalidRequiredInput = true; 
    }

    /* Type check. If all the required fields are provided, check they are valid types. */
    if(!isInvalidRequiredInput)
    {
        /* Check for Date type. */
        if(!(request.object.get("dateActivated") instanceof Date))
        {
            typeErrors.push("dateActivated"); 
            isInvalidInput = true; 
        }
    }
    
    /* Returns success/failure response */ 
    if(isInvalidRequiredInput || isInvalidTypeInput)
    {
        errorMessage = generateErrorMessage(requiredErrors,typeErrors); 
        response.error(errorMessage);
    }
    else
    {
        response.success();
    }
}); 

/* 
  This function gets automatically called by Parse when HFTRUserEarnedAward object is saved. 
  Below is the full data model for User object. 
   ********************************
   * associatedUser  (required)   *
   * associatedAward (required)   *
   * awardMeta                    *
   * createdAt       (required)   *
   ********************************

   The input checks are cosisted of 2 types of test. 
   1. Required fields check. Check that all the required fields are provided.  
   2. Type check. If all the required fields are provided, make sure that the input is valid type. Note that this check will not be performed if at least one of the required fields is empty.  

*/

Parse.Cloud.beforeSave("HFTRUserEarnedAward", function(request, response) { 
    var errorMessage = "";
    var errors = [];  
    var isInvalidRequiredInput = false;               // will set to true if at least one input field is invalid  
    var isInvalidTypeInput = false;
    
    /* Required fields check. Make sure that the input value exists. */
    if(typeof request.object.get("associatedUser") === 'undefined')
    {
        requiredErrors.push("associatedUser");
        isInvalidRequiredInput = true; 
    }
    if(typeof request.object.get("associatedAward") === 'undefined')
    {
        requiredErrors.push("associatedAward");
        isInvalidRequiredInput = true; 
    }

    /* Type check. If all the required fields are provided, check they are valid types. */
    if(!isInvalidRequiredInput)
    {
        if(request.object.get("associatedUser").className !== "_User")
        {
            typeErrors.push("associatedUser");
            isInvalidTypeInput = true; 
        }
        if(request.object.get("associatedAward").className  !== "HFTRAward")
        {
            typeErrors.push("associatedAward");  
            isInvalidTypeInput = true; 
        }
    }

    /* Returns success/failure response */ 
    if(isInvalidRequiredInput || isInvalidTypeInput)
    {
        errorMessage = generateErrorMessage(requiredErrors,typeErrors); 
        response.error(errorMessage);
    }
    else
    {
        response.success();
    }
});

/* 
  This function gets automatically called by Parse when HFTRGeofence object is saved. 
  Below is the full data model for User object. 
   ********************************
   * type              (required) *
   * group             (required) *
   * name              (required) *
   * description                  *
   * geoLocation       (required) *
   * geoRadius         (required) *
   * messageNotification          *
   * messageAction                *
   * dateDeactivated   (required) *
   * dateDeactivated              *
   * associatedAward              *
   * _unique(type,group,name)     *
   ********************************

   The input checks are cosisted of 2 types of test. 
   1. Required fields check. Check that all the required fields are provided.  
   2. Type check. If all the required fields are provided, make sure that the input is valid type. Note that this check will not be performed if at least one of the required fields is empty.  
*/

Parse.Cloud.beforeSave("HFTRGeofence", function(request, response) {
    var typeEnum = ["Retailer", "ConventionCity", "ConventionCenter"];      // enforce enum strings
    var inputType = request.object.get("type");
    var errorMessage = "";
    var errors = [];  
    var isInvalidRequiredInput = false;               // will set to true if at least one input field is invalid  
    var isInvalidTypeInput = false;    

    /* Required fields check. Make sure that the input value exists. */
    if(typeof inputType === 'undefined')
    {
        requiredErrors.push("type"); 
        isInvalidRequiredInput = true; 
    }
    if(!request.object.get("group"))
    {
        requiredErrors.push("group");
        isInvalidRequiredInput = true; 
    }
    if(!request.object.get("name"))
    {
        requiredErrors.push("name"); 
        isInvalidRequiredInput = true; 
    }
    if(typeof request.object.get("geoLocation") === 'undefined')
    {
        requiredErrors.push("geoLocation"); 
        isInvalidRequiredInput = true; 
    }
    if(typeof request.object.get("geoRadius") === 'undefined')
    {
        requiredErrors.push("geoRadius"); 
        isInvalidRequiredInput = true; 
    }
    if(typeof request.object.get("dateDeactivated") === 'undefined')
    {
        requiredErrors.push("dateDeactivated"); 
        isInvalidRequiredInput = true; 
    }

    /* Type check. If all the required fields are provided, check they are valid types. */
    if(!isInvalidRequiredInput)
    {
        /* Check for Enum strings. */
        if(typeEnum.indexOf(inputType) == -1)                      // if the input type does not belong ot typeEnum
        {
            typeErrors.push("type"); 
            isInvalidTypeInput = true; 
        }
        /* Check for input Date type. */
        if(!(request.object.get("dateActivated") instanceof Date))
        {
            typeErrors.push("dateActivated"); 
            isInvalidTypeInput = true; 
        }

        /* Check for input class type. */ 
        if(request.object.get("geoLocation").className !== "GeoPoint")        // TODO: check for GeoPoint 
        {
            typeErrors.push("geoLocation"); 
            isInvalidTypeInput = true; 
        }
        if(!isInt(request.object.get("geoRadius")))       // use helper function to check if the value is Int
        {
            typeErrors.push("geoRadius"); 
            isInvalidTypeInput = true; 
        }
    }

    /* Returns success/failure response */ 
    if(isInvalidRequiredInput || isInvalidTypeInput)
    {
        errorMessage = generateErrorMessage(requiredErrors,typeErrors); 
        response.error(errorMessage);
    }
    else
    {
        response.success();
    }
}); 

/* 
  This function gets automatically called by Parse when HFTRBeacon object is saved. 
  Below is the full data model for User object. 
   *********************************************
   * uuid     (required)                       *
   * majorVersion                              *
   * minorVersion                              *
   * radius                                    *
   * messageNotification                       *
   * messageAction                             *
   * associatedAward                           *
   * associatedGeofence                        *
   * _unique(uuid, majorVerison, minorVersion) *
   *********************************************

   The input checks are cosisted of 2 types of test. 
   1. Required fields check. Check that all the required fields are provided.  
   2. Type check. If all the required fields are provided, make sure that the input is valid type. Note that this check will not be performed if at least one of the required fields is empty.  
*/

Parse.Cloud.beforeSave("HFTRBeacon", function(request, response) {
    var errorMessage = "";
    var errors = [];  
    var isInvalidRequiredInput = false;               // will set to true if at least one input field is invalid  
    var isInvalidTypeInput = false;     

    /* Required fields check. Make sure that the input value exists. */
    if(!request.object.get("uuid"))
    {
        errors.push("group");
        isInvalidRequiredInput = true; 
    }

    /* Type check. If all the required fields are provided, check they are valid types. */
    /* Check type of input if input has value (because these fields are not required). */
    if(typeof request.object.get("associatedAward") !== 'undefined')  // if associated award is provided, it should be a ParsePointer type to Award
    {
        if(request.object.get("associatedAward").className  !== "HFTRAward")
        {
            errors.push("associatedAward");
            isInvalidTypeInput = true; 
        } 
    }
    if(typeof request.object.get("associatedGeofence") !== 'undefined')  // if associated Geofence is provided, it should be a ParsePointer type to Geofence
    {
        if(request.object.get("associatedGeofence").className  !== "HFTRGeofence")
        {
            errors.push("invalid pointer type for associatedGeofence");
            isInvalidTypeInput = true; 
        } 
        /* TODO: this check needs to be tested.. */
        // else if(request.object.get("associatedGeofence").type !== "ConventionCenter")  // Geofence type should be ConventionCenter 
        // {
        //   // var geoFenceObject = Parse.Object.extend("HFTRGeofence");
        //   // var query = new Parse.Query(geoFenceObject);
        //   // var objectId = "knFGTZGx1m";

        //   // query.get(objectId, {
        //   //   success: function(geoFenceObject) {
        //   //       console.log("here comes the geofenceobjet!");
        //   //       console.log(geoFenceObject);
        //   //   },
        //   //   error: function(object, error) {
        //   //       console.log("something wrong happend here");
        //   //   }
        //   // });
        //   errors.push("Geofence should be ConventionCenter");
        //   isInvalidTypeInput = true; 
        // }
    }
    if(typeof request.object.get("radius") !== 'undefined')   // if radius is provided, it should be Integer type
    {
        if(!isInt(request.object.get("radius")))
        {
            errors.push("radius"); 
            isInvalidTypeInput = true; 
        }
    }

    /* Returns success/failure response */ 
    if(isInvalidRequiredInput || isInvalidTypeInput)
    {
        errorMessage += generateErrorMessage(errors); 
        response.error(errorMessage);
    }
    else 
    {
        response.success(); 
    }
});

/* Helper function to create an array with list of country codes. */
function createCountryEnum() 
{ 
    var countryEnum = [
      'AF','AX','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AU','AT','AZ','BS','BH','BD','BB',
      'BY','BE','BZ','BJ','BM','BT','BO','BA','BW','BV','BR','IO','BN','BG','BF','BI','KH','CM','CA','CV',
      'KY','CF','TD','CL','CN','CX','CC','CO','KM','CG','CD','CK','CR','CI','HR','CU','CY','CZ','DK','DJ',
      'DM','DO','EC','EG','SV','GQ','ER','EE','ET','FK','FO','FJ','FI','FR','GF','PF','TF','GA','GM','GE',
      'DE','GH','GI','GR','GL','GD','GP','GU','GT','GG','GN','GW','GY','HT','HM','VA','HN','HK','HU','IS',
      'IN','ID','IR','IQ','IE','IM','IL','IT','JM','JP','JE','JO','KZ','KE','KI','KR','KW','KG','LA','LV',
      'LB','LS','LR','LY','LI','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MQ','MR','MU','YT',
      'MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA','NR','NP','NL','AN','NC','NZ','NI','NE','NG',
      'NU','NF','MP','NO','OM','PK','PW','PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','RE','RO',
      'RU','RW','BL','SH','KN','LC','MF','PM','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SK','SI',
      'SB','SO','ZA','GS','ES','LK','SD','SR','SJ','SZ','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TK',
      'TO','TT','TN','TR','TM','TC','TV','UG','UA','AE','GB','US','UM','UY','UZ','VU','VE','VN','VG','VI',
      'WF','EH','YE','ZM','ZW',
    ];
    return countryEnum;
}

/* Helper function to generate error messages. erros parameter is an array that contains list of errors.  */
function generateErrorMessage(requiredErrors,typeErrors)
{
      var requiredErrorMessage = "";
      var typeErrorMessage = "";
      var errorMessage = "";
      for(var i = 0; i < requiredErrors.length; ++i)
      {
          if(i == 0)
          {
              requiredErrorMessage += "Following required fields are empty: ";
              requiredErrorMessage += requiredErrors[i];
          }
          else 
          {
              requiredErrorMessage += ", " + requiredErrors[i];
              if( i == requiredErrors.length - 1)
              {
                  requiredErrorMessage += ". ";
              }
          }
      }
      for(var i = 0; i < typeErrors.length; ++i)
      {
          if(i == 0)
          {
              typeErrorMessage += "Following fields have invalid types: ";
              typeErrorMessage += typeErrors[i];
          }
          else 
          {
              typeErrorMessage += ", " + typeErrors[i];
              if( i == typeErrors.length - 1)
              {
                  typeErrorMessage += ". ";
              }
          }
      }

      errorMessage = requiredErrorMessage + typeErrorMessage; 
      return errorMessage;
}

/* Helper function that checks whether the value is int or not */
function isInt(value) 
{
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
}
