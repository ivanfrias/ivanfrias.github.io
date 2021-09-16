---
layout: page
title: Fuze Projects
permalink: /projects/fuze
---

# Fuze projects
## _Bulk sound upload utility_

**Type**: customer-facing

**Architecture**: command-line utility

**Description**: Developed a command-line bulk upload tool, used by a large customer to upload
call-flow related audio-files on a regular basis.

**Technologies**: Nodejs, mocha, chai, Typescript, REST

## _Number Portability_

**Type**: customer&internal facing

**Architecture**: full-stack

**Description**: Full-stack developer on an internal project ( front-end and back-end ) that automates number
request/number porting from loosing carriers. Front-end is a React web-application integrated
on Fuze's customer provisioning portal. Back-end is a micro-service that acts as
an _integration hub_ between Fuze homegrown APIs and 3rd Party Number Carriers.
The focus currently is to redesigning the back-end application
to increase the code quality through adding unit & integration tests and building new features on top of the existing codebase.

This is a high visibility and complex monolithic application.

**Technologies**: React, HTML, CSS, JavaScript, Typescript, Java 8, Spring, Docker, Junit 4/5, TestNG, Mockito, Postgres, Liquibase, MyBatis  

## _Contact Rosters Hub features_

**Type**: customer&internal facing

**Architecture**: Front-end

**Description**: Worked as a front-end developer on a working group initiative to implement
from scratch a new back-office feature that alows end-customers to configure groups of contacts, their visibility to other groups and manage
associated peers.

**Technologies**: React, HTML, CSS, JavaScript, TypeScript, REST, Selenium, Mocha

## _Bulk Provisioning Utility_

**Type**: internal facing

**Architecture**: Desktop-application

**Description**: Developed a bulk provisioning application used by internal teams - services & support. This application allows users to
upload CSV files (cutsheets) containing user-related meta-data used for provisioning.
This is a desktop application that presents a view of existing Fuze information,
requested information and lets the user see what will be added, modified or deleted on a
customer account. The tool then assembles the provisioning workflow and executes the provisioning routes decreasing the time
required to provision from hours to seconds.

**Technologies**: Vue.js, Vuex, Vuetify, HTML, CSS, Electron, Node.js, CouchDB, REST

## _Email2Fax service_

**Type**: customer facing

**Architecture**: Serverless microservice

**Description**: Developed a small microservice that parsed the content of an email ( subject, body, attachment ) and sent a new FAX using homegrown APIs.

**Technologies**
Node.js, Javascript, AWS Lambda, AWS SNS, AWS S3, REST

## _Customized C2C Browser plugin_

**Type**: customer&internal facing

**Architecture**: Full-stack ( browser plugin, web back-office application and microservice )

**Description**: Customized an existing browser extension to allow placing calls
to other peers by masking the calling number, effectively using another number also owned by the customer.
To query the masked numbers I've developed a microservice to expose the masking calling numbers to other clients ( browser extension ).
Masking numbers are inserted through a back-office web-application specifically created for that effect.

**Technologies**
Vue.js, HTML, CSS, REST, AWS S3, Javascript, Bootstrap, AWS Route 53, AWS EC2

## _SIP Peers Lookup web-application_

**Type**: internal facing

**Architecture**: Full-stack

**Description**: Scoped, designed and implemented a web application used to access sensitive data ( SIP Peer data ), by successfully allowing other teams
to visualize (filtering, searching and sorting ) sensitive information. This was micro-service driven application that used
a web application to enable access to information to end-users and a micro-service to enable
queries to the central Peers database ( owned by Engineering ).

**Technologies**
Vue.js, Javascript, HTML, CSS, REST, AWS EC2, Express.js, AWS Route 53

## _Fuze Connect Provisioning Tool_

**Type**: internal facing

**Architecture**: Full-stack

**Description**: Implemented a back-office web application to access configuration information
for the Fuze Connect product and enable to provision new users and related information.
This tool is currently being used by internal teams. It consists on a web application powered
by Vue.js and a microservice developed on Express.js

**Technologies**
Vue.js, Javascript, HTML, CSS, REST, AWS EC2, Express.js, AWS Route 53, MySQL
