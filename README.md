# Factory Information System of a Production Line

## Description of the Task

To create a model to identify, organize and distribute the pertinent information of a Factory Production Line in a way that is useful by achieveing the following opbjectives:
* Monitor machine status and availability
* Provide real-time performance data on real-time screens and reports
* Collect and archive data automatically from production lines and machining stations.

## Programming Environment
* Language: JavaScript / nodeJs
* IDE: Webstorm
* Software Design Tool: Visual Paradigm

## Physical Environment

<a href="https://drive.google.com/uc?export=view&id=1V7rXDKlPRdt0Ys3_nBNnIPnGuYmDiw1a"><img src="https://drive.google.com/uc?export=view&id=1V7rXDKlPRdt0Ys3_nBNnIPnGuYmDiw1a" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>

The FASTory assembly line is used to assemble electronic devices. FASTory research environment is located in Tampere University of Technology, FAST-Lab., Finland. The FASTory line contains 10 identical workstations, which draw the main parts of three models of a mobile phone (WS 2-6 and 8-12). In addition, there is workstation, which is used to load raw materials (empty papers) and unload products (paper with mobile phone drawing) to/from pallets (WS 1). Finally, the twelfth workstation (WS7) is use for loading/ unloading pallets to the line

Before being called the FASTory line, the line was used for assembling real mobile phones. The pallets were equipped with a special jig for holding the mobile phones during the production process. See Figure 2. The line then was transformed for education and R&D
(research and development) purposes. The modification covered the pallets, end-effectors and sensors.

### Pneumatic System
The FASTory line requires an air pressure to work properly. The air pressure is used to actuate the track selector in the conveyor and the end effector in the robots. Thus, each work cell has a manual valve, pressure relief valve and solenoid valve

### Conveyors

Each workstation in the FASTory line consist of two conveyors; main and bypass. The main conveyor is used if the pallet requires service from the work cell. Meanwhile, the bypass is used if the work cell is in busy state (another pallet(s) [max 2 pallets] are in the cell) to bypass the pallet to the next work cell. 

There are five different types of zones. In each zone, there is one presence sensor that is used for detecting the pallet presence.
In addition, there is one stopper to stop the pallet when the conveyor is transferring other pallets. An RFID reader is located in each zone 1 for each workstation. This reader reads the pallet’s tags for identifying the entering pallet

### Robots

The factory line uses SONY SCARA robots for production. Each robot is represented as an RTU in the line. The robot has 4 DOF(X, Y, Z and Rz). The robot uses custom-made end-effector for grapping the pen. In this manner, a custom-made jig holds three different pens allowing the robot to pick the needed one

### Sensors

As highlighted in Conveyor Section, each zone in the conveyor has a presence magnetic proximity sensor to detect the presence of pallets.

### RFID Readers

In order to identify the pallets in the line, The FASTory line is equipped with RFID reader (in each Z1) that can read the attached tags beneath the pallets. The reading mechanism uses the RS-232 serial communication by the conveyor RTU.

### Actuators
In the FASTory line, there are two pneumatic actuators; stoppers and path selector. The stopper stops the pallet in each zone. Meanwhile, the path selector switches between main and bypass conveyors.

## Communication / Fastory RTU
The FASTory is equipped with INICO S1000 Remote Terminal Units (RTUs). INICO S1000 is a programmable RTU device, which offers process control capabilities, as well as a Web-based Human-Machine Interface (HMI), and it supports REST and DPWS Web Services. Each Robot and Conveyor is controlled by an RTU. The RTUs are connected to the FASTory local network 


----------------------------------------------------------------------------------------------------------------------------------------


# Solution

## System Architecture

<a href="https://drive.google.com/uc?export=view&id=1V7rXDKlPRdt0Ys3_nBNnIPnGuYmDiw1a"><img src="https://drive.google.com/uc?export=view&id=1V7rXDKlPRdt0Ys3_nBNnIPnGuYmDiw1a" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>

The system uses the architecture as displayed in the Figure in the previous page.
The NodeJS Application as a whole consists of the UI Layer and the System Integration Layer of which the interfaces the Monitoring and the Persistence Layers.
The Production Line is manually orchestrated by the user and these events are then sent to the node application which are subscribed to it. The node application processes the information and manipulates it to perform two main activities.
* It gives a real-time feedback to the user about the statuses of the pallets and displays it to
the web browser.
* It stores the information permanently in the MySQL Database (Persistence Layer)

## Front End Development

<a href="https://drive.google.com/uc?export=view&id=1oT7rw3c9mQKmrl3sbpLjUiQ0gYEsRUgw"><img src="https://drive.google.com/uc?export=view&id=1oT7rw3c9mQKmrl3sbpLjUiQ0gYEsRUgw" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>

### Features of the UI
* Uses Form Validation to not allow users to Place Order without entering vital information such as Name, Address and Phone number
* Uses CSS to remind user of the missing information.
* Enables User to enter multiple orders using the Add Order button
* Allows User to delete and order by ticking a check box and pressing the delete row button in case the user inputs an erroneous order.
* Shows a preview of the Order entered so far.

### How to place an Order
* Fill User details in the Name, Address and Phone number fields
* Select the Order Variant by the drop down menus
* Add multiple Orders using the Add row Button
* Delete any order if necessary by checking the box adjacent to the order and pressing the “delete order button”
* Press the send button to place the order

### Real-Time Analytics

<a href="https://drive.google.com/uc?export=view&id=1anaBEmqfVdC9Fp1_ayyN95WNIo6VIAHF"><img src="https://drive.google.com/uc?export=view&id=1anaBEmqfVdC9Fp1_ayyN95WNIo6VIAHF" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>


## Back-End Development

### My SQL Database

#### Customers Table

<a href="https://drive.google.com/uc?export=view&id=1-7l2j-GUGHqtDdDJdwPqZeKn2Yu0FHKR"><img src="https://drive.google.com/uc?export=view&id=1-7l2j-GUGHqtDdDJdwPqZeKn2Yu0FHKR" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>

The Customer Table consists of 5 fields whose Names and Data Types are shown above. The CustomerID Field is the Primary Key of the Table and is set to increment from 1000. The Name Field takes a NOT NULL constraint which simply means that it cannot be left empty. This condition is taken care of the Front End Script( JavaScript and CSS) which does not allow the user to submit if the field is left blank (will be shown in the Front End Development Section of this Paper).

Queries Used for the Table (multiple queries are used for clarity even though they could be combined:
* CREATE TABLE Customers(Sno int(5), CustomerID int(5) PRIMARY KEY, Name char(30) NOT NULL,
* Address char(50), TelephoneNo BIGINT UNSIGNED);
* ALTER TABLE Customers MODIFY CustomerID INT(5) AUTO_INCREMENT;
* ALTER TABLE Customers AUTO_INCREMENT=1000;

#### Products Table

<a href="https://drive.google.com/uc?export=view&id=1nEHwwQ0nTxmGi6cd-i0RIMkc5A7NDMxy"><img src="https://drive.google.com/uc?export=view&id=1nEHwwQ0nTxmGi6cd-i0RIMkc5A7NDMxy" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>

Queries Used for the Table:
* **CREATE TABLE** Products(Sno **INT(5**), ProductID **int(5) PRIMARY KEY**, FrameType **char(10)**, FrameColour **char(10)**, ScreenType **char(10)**, ScreenColour **char(10)**, KeyboardType **char(10)**, KeyboardColour **char(10)**, Quantity **int(3)**, Status **enum**('ordered','processed','manufactured'));

* **ALTER TABLE** Products **ALTER** Quantity **SET DEFAULT** 1;
* **ALTER TABLE** Products **ALTER Status SET DEFAULT** ordered;

#### Orders Table

<a href="https://drive.google.com/uc?export=view&id=1x569ibiLXHQiREWVUJVjfRgbLMvpGVFb"><img src="https://drive.google.com/uc?export=view&id=1x569ibiLXHQiREWVUJVjfRgbLMvpGVFb" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>

The Orders Table Consists of 6 Fields whose Names and Data Types are shown above. It is to be noted that OrderID field is the Primary Key and is set to Increment at a starting Value of 5000. Also the Date_time field takes a default value of the current time at the time of the order.

**Queries Used for the Table:**

* **CREATE TABLE** Orders (SNo int(5), OrderID int(5) PRIMARY KEY, CustomerID int(5), ProductID int(5), Quantity int(3), Date_time TIMESTAMP DEFAULT NOW());
* **ALTER TABLE** Orders **MODIFY** OrderID **INT(5) AUTO_INCREMENT**;
* **ALTER TABLE** Orders **AUTO_INCREMENT**=5000;

#### Pallets Table

<a href="https://drive.google.com/uc?export=view&id=1FGPcLwfBS_0635HSQc6f7CXkVFSvqt3Y"><img src="https://drive.google.com/uc?export=view&id=1FGPcLwfBS_0635HSQc6f7CXkVFSvqt3Y" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>

**Queries Used for the Table:**

* **CREATE TABLE** Pallets (Sno **INT(5) PRIMARY KEY**, CustomerID **INT(5) DEFAULT NULL**, OrderID **INT(5)**, OrderTime **VARCHAR(30)**, Name **VARCHAR(30) DEFAULT NULL**, ProductID **VARCHAR (20)**, PalletID **BIGINT UNSIGNED**, Frame **VARCHAR(50) DEFAULT** 'Pending',Screen VARCHAR(50) **DEFAULT** 'Pending',Keyboard **VARCHAR(50) DEFAULT** 'Pending',Current_Loc **VARCHAR(15) DEFAULT** 'N/A' ,Status **enum**('pending','in_production' , 'manufactured') **DEFAULT** 'pending');
* **ALTER TABLE** Pallets **MODIFY** Sno **INT(5) AUTO_INCREMENT**;
* **ALTER TABLE** Pallets **AUTO_INCREMENT**=1;
