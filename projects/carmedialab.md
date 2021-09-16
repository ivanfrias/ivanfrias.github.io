---
layout: page
title: CarMediaLab Projects
permalink: /projects/whitus-carmedialab
---

# CarMediaLab projects
## _Tour de France Real-Time vehicle tracking app_

**Type**: customer-facing

**Architecture**: full-stack

**Description**: I've participated on the development of this application that was initially built to receive realtime events from HW ( Hardware ) Boxes installed on vehicles. Events were then delivered via MQTT to the app which displayed realtime information about the position of vehicles on map. My role while working at this was to re-engineer the existing web-app built on Vaadin by upgrading to the latest version. As part of the effort it was required that the application needed to be split into smaller individual components for easier maintainability, support and scalability. Addressed maintenance and bug fixing of the app during pilot-stage.

**Technologies**: Vaadin, Apache Geronima, Google Maps, Ivy, Java 8

## _EV Power Supply And Demand_

**Type**: customer-facing

**Architecture**: full-stack

**Description**: This web-application consisted on two different views: First view to configure the back-end by provided test data related with EVs and Charging Pillars and a second view that displayed information about EVs, Charging Pillars. EV and Charging Pillars data was provided to a third party library that provided an algorithm that determined the energy demand&consumption during a specific time-frame. I've worked mostly on front-end ( back-office and front-office ) as well as creating the unit tests on the domain model and persistence layers.

**Technologies**: Vaadin, Apache Geronimo, Google Maps, Ivy, Java 8, JUnit 5, MongoDB, ActiveMQ, Jenkins

## _Linux Package Manager Web-GUI_

**Type**: internal-facing

**Architecture**: full-stack

**Description**: CarMediaLab dependended heavily on package management as part of their process for software release ( for the HW Boxes). Package management on linux is a very cumbersome and manual intensive task which also happens to be very error prone. Since there wasn't at the time a good and reliable tool to generate and validate packages, I was tasked with the development of a web-gui based tool that did just that - enabled to validate dependencies in the context of the generation of a new package and also, generate those packages, by displaying that information nicely on a modern web-application that was extendable, scalable and more feature rich when compared with a bash or zsh shell. My role was to scope, design, implement and produce documentation to assist on the deploy of the tool.

**Technologies**: Vaadin, Apache Geronimo, Arch Linux, Ivy, Java 8

## _Fleet Management Tool_

**Type**: customer/internal-facing

**Architecture**: full-stack

**Description**: CarMediaLab is a company well-known for the development of hardware and software solutions for the automotive industries. The hardware tipically installed on vehicles gather a lot of information about the vehicles themselves which is then relayed to central data-stores . Given the lack of a proper way to visualize this information, I was tasked with the development of a full application capable of parsing information contained on XML files, model that information into a specific app domain model, by persisting it into a SQL database and present that information back to the user on a nice web-app GUI. This tool had several requirements, especially being able to group entities (regular vehicles, EVs - electric vehicles and later charging pillars) and display information about those elements on different views inside the application( Vehicles, EVs and Charging Pillars). The tool also provided detailed data about the entities as well as location information on map.
Authentication and Authorization was managed in-app. I've developed a small back-office view that allowed the creation of roles and customization of viewing rules for each role.

**Technologies**: Vaadin, Java EE, Apache Geronimo, EJB3.1, OpenJPA, Oracle Database, Google Maps, HTML/CSS, Ivy, Flyway, Vagrant
