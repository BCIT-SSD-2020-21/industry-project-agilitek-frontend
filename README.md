# :page_with_curl: Agilitek Automation Project

[![GitHub issues](https://img.shields.io/github/issues/BCIT-SSD-2020-21/industry-project-agilitek)](https://github.com/BCIT-SSD-2020-21/industry-project-agilitek/issues) [![GitHub stars](https://img.shields.io/github/stars/BCIT-SSD-2020-21/industry-project-agilitek)](https://github.com/BCIT-SSD-2020-21/industry-project-agilitek/stargazers)

[Heroku Deployment](https://agilitek-fan-data-platform.herokuapp.com/)

## :bulb: Motivation

For a user to be able to perform an action against a list of customer contacts that match a certain condition

## :bell: Status

![In Development](https://img.shields.io/badge/Status-In%20Development-blue)

## <i class="fa fa-gear fa-spin fa-1x" style="color: firebrick"></i> Installation

- Installed latest version of NodeJS
- Clone Repo

## :camera: Screenshots

![homePAge](https://user-images.githubusercontent.com/22161200/116915974-8fa78f80-ac01-11eb-86b1-75ed05da6f4f.png)

![details](https://user-images.githubusercontent.com/22161200/116915985-946c4380-ac01-11eb-8e6a-5966807d1b2f.png)

![newconfig](https://user-images.githubusercontent.com/22161200/116915992-96360700-ac01-11eb-8dfa-02b783cd7007.png)

## :computer: Tech/FrameWorks

- AWS (RDS, API Gateway, Lambda, EventBridge, Step Functions)
- Node.js
- PostgreSQL
- React
- Tailwind UI

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

### GET All the available custom flows from Salesforce

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

<hr>

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

<hr>

## :tada: Credits

Created by:<br>
[Leanne Sall](https://github.com/LeanneSall),<br>
[Gökay Abay](https://github.com/gokay-abay),<br>
[Nick Charvat](https://github.com/nickchvt):poop:,<br>
[Steven Lai](https://github.com/stevenlai4),<br>
[Yaroslav Naft](https://github.com/Yaroslav-Naft),<br>
In partnership with [Agilitek Solutions](http://agiliteksolutions.com/)

## :lock: License

[![GitHub license](https://img.shields.io/github/license/BCIT-SSD-2020-21/industry-project-agilitek)](https://github.com/BCIT-SSD-2020-21/industry-project-agilitek)
