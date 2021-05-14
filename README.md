# :page_with_curl: Agilitek Automation Project

[![GitHub issues](https://img.shields.io/github/issues/BCIT-SSD-2020-21/industry-project-agilitek)](https://github.com/BCIT-SSD-2020-21/industry-project-agilitek/issues) [![GitHub stars](https://img.shields.io/github/stars/BCIT-SSD-2020-21/industry-project-agilitek)](https://github.com/BCIT-SSD-2020-21/industry-project-agilitek/stargazers)

[Heroku Deployment](https://agilitek-fan-data-platform.herokuapp.com/)

[Heroku Deployment with Auth](https://agilitek-auth.herokuapp.com/)

⚠️ Note: The current Beta version of the app with Auth has a bug specific to Login In with google Credentials. The google developper keys for the app are causing issue with user not being able to logout so Auth0 Dev keys are currently used but this creates the problem to prompt the user to log back in whenever the page is refreshed.

## :bulb: Motivation

For a user to be able to perform an action against a list of customer contacts that match a certain condition

## :bell: Status

![In Development](https://img.shields.io/badge/Status-In%20Development-blue)

## <i class="fa fa-gear fa-spin fa-1x" style="color: firebrick"></i> Installation

- Install NPM ([Npm Docs](https://docs.npmjs.com/about-npm))
- Install Git to your local machine ([Git Docs](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))
- Git clone repo
- Open up the project folder

```
npm install
npm start
```

## :camera: Screenshots

![homePAge](https://user-images.githubusercontent.com/22161200/116915974-8fa78f80-ac01-11eb-86b1-75ed05da6f4f.png)

![details](https://user-images.githubusercontent.com/22161200/116915985-946c4380-ac01-11eb-8e6a-5966807d1b2f.png)

![newconfig](https://user-images.githubusercontent.com/22161200/116915992-96360700-ac01-11eb-8dfa-02b783cd7007.png)

## :computer: Tech/FrameWorks

- AWS (RDS, API Gateway, Lambda, EventBridge, Step Functions)
- Node.js 14.15.4
- NPM 6.14.10
- PostgreSQL
- React 17.0.2
- Tailwind UI 0.3.2

## :chart_with_upwards_trend: Feature List

TBD with input from team

### Core Features

- Create, view, pause or un-pause automation
- Enter any SQL statment(as long as it returns a list of Salesforce Contact IDs)
- User can select salesforce flow
- User can select true false indicator indicating whether or not a user workflow can run on the same set of contacts multiple times
- Show execution logs
- Multiple automations

### Nice-To-Have

- Adding capability to "map" additional columns of the SQL statement output to additional "API Input Parameters"
- Edit and delete automation
- User authentication/authorization
- Search functionality for user workflow page

### Functional

- User can create, view, pause or unpause automation
- System queries the databases upon triggering automation
- Contact ID's returned from SQL query are posted to Salesforce flow

### Non-Functional

- Multiple automations
- Show output logs

### Roles and Permission

- User
  - Log in
  - Create automation(s)
  - Enter any SQL statement
  - Pick Salesforce Flow
  - True/False Indicator
  - View Execution Logs/current automations
  - (un)Pause a new automation

## :memo: How to use?

## :newspaper: Supporting Documents

### Diagram

![](https://i.imgur.com/Gx9cBal.png)

### Mockup

[Figma Mockup](https://www.figma.com/file/LygDwPwX36r9qQos5ivEKh/Agilitek-Data-Fan-Platform?node-id=0%3A1)

![](https://i.imgur.com/SivzG0t.png)

### ERD

![](https://i.imgur.com/MR8ljRd.png)

# SSD-Agilitek Fan Data Platfrom API Documentation

## Salesforce Flow

### `GET`

### Get all flows from Salesforce

### `/salesforceflows`

### Sample response:

    {
        "actions" : [
            {
                "label": "Create Opportunities",
                "name": "Create_Opportunities",
                "type": "FLOW",
                "url": "/services/data/v51.0/actions/custom/flow/Create_Opportunities"
            },
            {
                "label": "Create Opportunity",
                "name": "Create_Opportunity",
                "type": "FLOW",
                "url": "/services/data/v51.0/actions/custom/flow/Create_Opportunity"
            }
        ]
    }

<hr />

### `GET`

### Get flow inputs

### `/salesforceflows/flow`

### Sample query string parameter:

`/salesforceflows/flow?flowUrl=/services/data/v51.0/actions/custom/flow/Create_Opportunity`

OR

`flowUrl=/services/data/v51.0/actions/custom/flow/Create_Opportunity`

### Sample response:

    {
      "label": "ContactToProcess",
      "type": "STRING"
    }

<hr />

### `POST`

### Triggers custom Salesforce flows

### `/salesforceflows/flow`

### Sample body:

    {
        "inputs": [
            {
                "contactId": "0034x000007DXthAAG"
            }
        ],
        "salesforceFlowName: "create_opportunity",
    }

OR

    {
        "inputs": [
            {
                "ContactsToProcess": [
                    {
                        "attributes": {"type": "Contact"},
                        "Id" : "0034x000007DYA3AAO"
                    },
                    {
                        "attributes": {"type": "Contact"},
                        "Id" : "0034x000001c4YQAAY"
                    },
                    {
                        "attributes": {"type": "Contact"},
                        "Id" : "0034x000003YaRvAAK"
                    }
                ]
            }
        ]
    }

### Sample response:

    [
        {
            "actionName": "Create_Opportunity",
            "errors": null,
            "isSuccess": true,
            "outputValues": {
                "recordId": null,
                "Flow__InterviewStatus": "Finished"
            }
        }
    ]

OR

    [
        {
            "actionName": "Create_Opportunities",
            "errors": null,
            "isSuccess": true,
            "outputValues": null
        }
    ]

<hr />

### `GET`

### Get metadata for sObject type

### `/salesforceflows/metadata`

### Sample query string parameter:

`/salesforceflows/metadata?sObjectType=Contact`

OR

`sObjectType=Contact`

### Sample response:

    {
      "metadata": [
        {
          "aggregatable": true,
          "aiPredictionField": false,
          "autoNumber": false,
          "byteLength": 18,
          "calculated": false,
          "calculatedFormula": null,
          "cascadeDelete": false,
          "caseSensitive": false,
          "compoundFieldName": null,
          "controllerName": null,
          "createable": false,
          "custom": false,
          "defaultValue": null,
          "defaultValueFormula": null,
          "defaultedOnCreate": true,
          "dependentPicklist": false,
          "deprecatedAndHidden": false,
          "digits": 0,
          "displayLocationInDecimal": false,
          "encrypted": false,
          "externalId": false,
          "extraTypeInfo": null,
          "filterable": true,
          "filteredLookupInfo": null,
          "formulaTreatNullNumberAsZero": false,
          "groupable": true,
          "highScaleNumber": false,
          "htmlFormatted": false,
          "idLookup": true,
          "inlineHelpText": null,
          "label": "Contact ID",
          "length": 18,
          "mask": null,
          "maskType": null,
          "name": "Id",
          "nameField": false,
          "namePointing": false,
          "nillable": false,
          "permissionable": false,
          "picklistValues": [],
          "polymorphicForeignKey": false,
          "precision": 0,
          "queryByDistance": false,
          "referenceTargetField": null,
          "referenceTo": [],
          "relationshipName": null,
          "relationshipOrder": null,
          "restrictedDelete": false,
          "restrictedPicklist": false,
          "scale": 0,
          "searchPrefilterable": false,
          "soapType": "tns:ID",
          "sortable": true,
          "type": "id",
          "unique": false,
          "updateable": false,
          "writeRequiresMasterRead": false
        },
        ...
    }

<br />

## Database

### `GET`

### Get all database tables

### `/database`

### Sample response:

    {
       "statusCode":200,
       "body":[
          {
             "table_name":"SalesforceContacts"
          },
          {
             "table_name":"contact_workflows"
          },
          {
             "table_name":"workflows"
          },
          {
             "table_name":"workflow_logs"
          },
          {
             "table_name":"users"
          }
       ],
       "headers":{
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Headers":"*"
       }
    }

<hr />

### `GET`

### Get all columns from a table

### `/database/{table_name}/columns`

### Sample URL parameter:

`/database/users/columns`

### Sample response:

    [
      {
        "column_name": "salesforce_id"
      },
      {
        "column_name": "first_name"
      },
      {
        "column_name": "last_name"
      }
    ]

<br />

## My Workflow

### `GET`

### Get all workflows

### `/myworkflows`

### Sample response:

    [
      {
        "id": 20,
        "flow_url": "/services/data/v51.0/actions/custom/flow/Create_Opportunity",
        "name": "www",
        "description": "",
        "table": "SalesforceContacts",
        "column": "id",
        "label": "ContactToProcess",
        "type": "STRING",
        "sobject_type": "undefined",
        "where_clause": "length(title) > 0",
        "mapping": {},
        "run_again": true,
        "active": true,
        "pk_column": "id"
      },
      {
        "id": 8,
        "flow_url": "/services/data/v51.0/actions/custom/flow/Create_Opportunities",
        "name": "Test Create_Opportunity",
        "description": "undefined",
        "table": "SalesforceContacts",
        "column": "",
        "label": "ContactsToProcess",
        "type": "SOBJECT",
        "sobject_type": "Contact",
        "where_clause": "length(email) > 0",
        "mapping": {
          "OtherAddress": "lastmodifieddate",
          "OtherStreet": "lastmodifiedbyid",
          "Name": "fan_type__c",
          "Id": "id"
        },
        "run_again": true,
        "active": true,
        "pk_column": "id"
      }
    ]

<hr />
    
### `POST`

### Create a new workflow

### `/myworkflows`

### Sample body:

    {
       "name":"My Test Workflow",
       "desc":"Some automation",
       "flowUrl":"/services/data/v51.0/actions/custom/flow/Create_Opportunities",
       "table":"SalesforceContacts",
       "column":"",
       "label":"ContactsToProcess",
       "type":"SOBJECT",
       "sObjectType":"Contact",
       "whereClause":"length(email) > 0",
       "mapping":{
          "Id":"id",
          "Title":"title"
       },
       "active":true,
       "runAgain":true
    }

### Sample response:

    {
       "statusCode":200,
       "body":{
          "command":"INSERT",
          "rowCount":1,
          "oid":0,
          "rows":[],
          "fields":[],
          "_types":{
             "_types":{
                "arrayParser":{

                },
                "builtins":{
                   "BOOL":16,
                   "BYTEA":17,
                   "CHAR":18,
                    ...
                }
             },
             "text":{},
             "binary":{}
          },
          "RowCtor":null,
          "rowAsArray":false
       },
       "headers":{
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Headers":"*"
       }
    }

<hr />

### `GET`

### Get workflow logs

### `/myworkflows/logs/{id+}`

### Sample URL parameter:

`/myworkflows/logs/8`

### Sample response:

    [
      {
        "id": 13,
        "workflow_id": 8,
        "action_name": "Create_Opportunity",
        "time_of_completion": "2021-05-03T18:23:01.267Z",
        "is_flow_successful": true
      },
      {
        "id": 15,
        "workflow_id": 8,
        "action_name": "Create_Opportunity",
        "time_of_completion": "2021-05-03T18:25:51.146Z",
        "is_flow_successful": true
      }
    ]

<hr />

### `DELETE`

### Delete a workflow

### `/myworkflows/{id+}`

### Sample URL parameter:

`/myworkflows/23`

### Sample response

    {
       "Access-Control-Allow-Origin":"*",
       "Access-Control-Allow-Headers":"*",
       "X-Amzn-Trace-Id":"Root=1-60930ed6-9c95119c8a4e9068020833b3;Sampled=0"
    }

<hr />

### `GET`

### Get a workflow

### `/myworkflows/{id+}`

### Sample URL parameter:

`/myworkflows/13`

### Sample response:

    {
      "id": 13,
      "flow_url": "/services/data/v51.0/actions/custom/flow/Create_Opportunities",
      "name": "Test test 123",
      "description": "undefined",
      "table": "SalesforceContacts",
      "column": "",
      "label": "ContactsToProcess",
      "type": "SOBJECT",
      "sobject_type": "Contact",
      "where_clause": "length(title) > 0",
      "mapping": {
        "MasterRecordId": "assistantphone",
        "AccountId": "createddate",
        "Id": "id"
      },
      "run_again": true,
      "active": true,
      "pk_column": "id"
    }

<hr />

### `PUT`

### Update a workflow

### `/myworkflows/{id+}`

### Sample URL paramter:

`/myworkflows/13`

### Sample body:

    {
      "name": "My Test Workflow",
      "desc": "Some automation",
      "flowUrl": "/services/data/v51.0/actions/custom/flow/Create_Opportunities",
      "table": "SalesforceContacts",
      "column": "",
      "label": "ContactsToProcess",
      "type": "SOBJECT",
      "sObjectType": "Contact",
      "whereClause": "length(email) > 0",
      "mapping": {
        "Id": "id",
        "Title": "title"
      },
      "active": true,
      "runAgain": true
    }

### Sample response:

    {
      "command": "UPDATE",
      "rowCount": 1,
      "oid": null,
      "rows": [],
      "fields": [],
      "_types": {
        "_types": {
          "arrayParser": {},
          "builtins": {
            "BOOL": 16,
            "BYTEA": 17,
            "CHAR": 18,
             ...
          }
        },
        "text": {},
        "binary": {}
      },
      "RowCtor": null,
      "rowAsArray": false
    }

<br />

## :tada: Credits

Created by:
[Leanne Sall](https://github.com/LeanneSall)
[Gökay Abay](https://github.com/gokay-abay)
[Nick Charvat](https://github.com/nickchvt) :poop:
[Steven Lai](https://github.com/stevenlai4)
[Yaroslav Naft](https://github.com/Yaroslav-Naft)
In partnership with [Agilitek Solutions](http://agiliteksolutions.com/)

## :lock: License

[![GitHub license](https://img.shields.io/github/license/BCIT-SSD-2020-21/industry-project-agilitek)](https://github.com/BCIT-SSD-2020-21/industry-project-agilitek)
