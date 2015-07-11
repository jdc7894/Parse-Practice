/* 
  This function gets automatically called by Parse when Parse User object is saved. 
  List of data fields checked in this function is listed below. 
  String: Checks if the input string is not empty 
    -username
    -firstname
    -lastname 
    -email 

  Boolean: Check that the input is selected either true/false value (i.e. not undefined)
    -isSubscribedToNewsletter

  Enum: Check that the input belongs to specified String enum (the values should exactly match)
    -registeredFromGame
    -countires             
    -gender

  Datetime: Check that the input is instance of Javascript Date Class.  
    -dob

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
*/

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  var registeredFromGame = "HFTR";                                                                   
  var genderEnum = ["Male", "Female"];
  var countryEnum = createCountryEnum();
  var countryCode = request.object.get("country");
  var errorMessage = "";
  var errors = [];                          // contains list of input fields that are invalid  
  var inputIsInvalid = false;               // will set to true if at least one input field is invalid  

  if(!request.object.get("username"))       
  { 
    errors.push("username");
    inputIsInvalid = true; 
  } 
  if(!request.object.get("email")) 
  {
    errors.push("email");
    inputIsInvalid = true; 
  } 
  if(!request.object.get("firstname"))       
  { 
    errors.push("firstname");
    inputIsInvalid = true; 
  } 
  if(!request.object.get("lastname"))       
  { 
    errors.push("lastname");
    inputIsInvalid = true; 
  } 
  if(request.object.get("registeredFromGame") !== registeredFromGame)         // should be 'HFTR'
  {
    errors.push("registeredFromGame");
    inputIsInvalid = true; 
  }
  if(!(request.object.get("dob") instanceof Date))
  {
    errors.push("date of birth");
    inputIsInvalid = true; 
  }
  if(countryEnum.indexOf(countryCode) == -1)                                // this country code does not exist in country code enum 
  {
    errors.push("country code")
  }
  if(typeof request.object.get("gender") !== 'undefined')                      // if gender field is not empty, it should be either Male or Female 
  {
    var genderType = request.object.get("gender"); 
    if(genderEnum.indexOf(genderType) == -1)                                    // if the input type does not belong ot typeEnum
    {
      errors.push("gender");
      inputIsInvalid = true; 
    }
  }
  if(typeof request.object.get("isSubscribedToNewsletter") === 'undefined')    // not selected true/false value 
  {
    errors.push("subscription preference");
    inputIsInvalid = true; 
  }
  

  /* Returns success/failure response */ 
  if(inputIsInvalid)      // return with error message, user object will not be saved to Parse. 
  {
    errorMessage = generateErrorMessage(errors);
    response.error(errorMessage);
  }
  else                    // no error was found, user object will be saved successfully.
  {
    response.success();
  }
});

/* 
  This function gets automatically called by Parse when HFTRAward object is saved. 
  List of data fields checked in this function is listed below. 
  String: Checks if the input string is not empty 
    -name

  Datetime: Check that the input is instance of Javascript Date Class.  
    -dateActivated

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
*/

Parse.Cloud.beforeSave("HFTRAward", function(request, response) {
  var errorMessage = "";
  var errors = [];  
  var inputIsInvalid = false; 

  /* name is likely to be not removed from this Data Model. TBD */
  // if(!request.object.get("name"))
  // {
  //   errors.push("name");
  //   inputIsInvalid = true; 
  // }
  if(!(request.object.get("dateActivated") instanceof Date))
  {
    errors.push("dateActivated"); 
    inputIsInvalid = true; 
  }

  /* Returns success/failure response */ 
  if(inputIsInvalid)
  {
    errorMessage += generateErrorMessage(errors); 
    response.error(errorMessage);
  }
  else
  {
    response.success();
  }
}); 

/* 
  This function gets automatically called by Parse when HFTRUserEarnedAward object is saved. 
  List of data fields checked in this function is listed below. 
  ParsePointer: Checks if the input is a pointer to specific Parse Class.  
    -associatedUser
    -associatedAward

  Datetime: Check that the input is instance of Javascript Date Class.  
    -createdAt
  
  Below is the full data model for User object. 
   ********************************
   * associatedUser  (required)   *
   * associatedAward (required)   *
   * awardMeta                    *
   * createdAt       (required)   *
   ********************************
*/

Parse.Cloud.beforeSave("HFTRUserEarnedAward", function(request, response) { 
  var errorMessage = "";
  var errors = [];  
  var inputIsInvalid = false; 

  if(request.object.get("associatedUser").className !== "_User")
  {
    errors.push("associatedUser");
    inputIsInvalid = true; 
  }
  if(request.object.get("associatedAward").className  !== "HFTRAward")
  {
    errors.push("associatedAward");  
    inputIsInvalid = true; 
  }

  /* Returns success/failure response */ 
  if(inputIsInvalid)
  {
    errorMessage += generateErrorMessage(errors); 
    response.error(errorMessage);
  }
  else
  {
    response.success();
  }
});

/* 
  This function gets automatically called by Parse when HFTRGeofence object is saved. 
  List of data fields checked in this function is listed below. 
  
  String: Checks if the input string is not empty 
    -group
    -name

  Enum: Check that the input belongs to specified String enum (the values should exactly match)
    -type

  GeoPoint: Check that the input is instance of Parse GeoPoint Class. 
    -geoLocation

  Integer: Check that the input is integer. 
    -geoRadius

  Datetime: Check that the input is the instance of Javascript Date Class.  
    -dateActivated

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
*/

Parse.Cloud.beforeSave("HFTRGeofence", function(request, response) {
  var typeEnum = ["Retailer", "ConventionCity", "ConventionCenter"];      // enforce enum strings
  var errorMessage = "";
  var errors = [];  
  var inputIsInvalid = false; 
  var inputType = request.object.get("type");

  if(typeEnum.indexOf(inputType) == -1)                      // if the input type does not belong ot typeEnum
  {
    errors.push("type"); 
    inputIsInvalid = true; 
  }
  if(!request.object.get("group"))
  {
    errors.push("group");
    inputIsInvalid = true; 
  }
  if(!request.object.get("name"))
  {
    errors.push("name"); 
    inputIsInvalid = true; 
  }
  // if(request.object.get("geoLocation").className !== "GeoPoint")        // TODO: check for GeoPoint 
  // {
  //   errors.push("geoLocation"); 
  //   inputIsInvalid = true; 
  // }
  // if(!isInt(request.object.get("geoRadius")))       // use helper function to check if the value is Int
  // {
  //   errors.push("geoRadius"); 
  //   inputIsInvalid = true; 
  // }
  // if(!(request.object.get("dateActivated") instanceof Date))
  // {
  //   errors.push("dateActivated"); 
  //   inputIsInvalid = true; 
  // }

  /* Returns success/failure response */ 
  if(inputIsInvalid)
  {
    errorMessage += generateErrorMessage(errors); 
    response.error(errorMessage);
  }
  else
  {
    response.success();
  }
}); 

/* 
  This function gets automatically called by Parse when HFTRBeacon object is saved. 
  List of data fields checked in this function is listed below. 
  String: Checks if the input string is not empty 
    -uuid
  
  Integer: Chect that the input is Integer
    -radius 

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
*/

Parse.Cloud.beforeSave("HFTRBeacon", function(request, response) {
  var errorMessage = "";
  var errors = [];  
  var inputIsInvalid = false;    
  Parse.Cloud.useMasterKey(); 

  if(!request.object.get("uuid"))
  {
    errors.push("group");
    inputIsInvalid = true; 
  }

  if(typeof request.object.get("radius") !== 'undefined')   // if radius is provided, it should be Integer type
  {
    if(!isInt(request.object.get("radius")))
    {
      errors.push("radius"); 
      inputIsInvalid = true; 
    }
  }
  if(typeof request.object.get("associatedAward") !== 'undefined')  // if associated award is provided, it should be a ParsePointer type to Award
  {
    if(request.object.get("associatedAward").className  !== "HFTRAward")
    {
      errors.push("associatedAward");
      inputIsInvalid = true; 
    } 
  }
  if(typeof request.object.get("associatedGeofence") !== 'undefined')  // if associated Geofence is provided, it should be a ParsePointer type to Geofence
  {
    if(request.object.get("associatedGeofence").className  !== "HFTRGeofence")
    {
      errors.push("invalid pointer type for associatedGeofence");
      inputIsInvalid = true; 
    } 
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
    //   inputIsInvalid = true; 
    // }
  }

    var geoFenceObject = Parse.Object.extend("HFTRGeofence");
    var query = new Parse.Query(geoFenceObject);
    query.equalTo("objectId", "TIj4PWy4n6");
    console.log("Trying to find geofence using object id...");
    query.find({
      success: function(results) {
        // alert("Successfully retrieved " + results.length + " scores.");
        // // Do something with the returned Parse.Object values
        // for (var i = 0; i < results.length; i++) {
        //   var object = results[i];
        //   alert(object.id + ' - ' + object.get('playerName'));
        // }
        console.log("Success man");
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
        console.log("The failure");
      }
    });

  /* Returns success/failure response */ 
  if(inputIsInvalid)
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
function generateErrorMessage(errors)
{
  var errorMessage = "Following fields are invalid: ";
  for(var i = 0; i < errors.length; ++i) 
    {
      if(i == 0)        
      {
        errorMessage += errors[i];
      }
      else 
      {
        errorMessage += ", " + errors[i];
      }
    }
    return errorMessage;
}

/* Helper function that checks whether the value is int or not */
function isInt(value) 
{
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}
