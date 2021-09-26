
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract PatientsCon {
    
    uint public Counter = 0;
    struct Patient {
        uint id;
        string name;
        int Phone;
        string In_charge;
    }

    mapping (uint => Patient) public patientsMap;

    event PatCreated(uint id ,string name ,int Phone ,string In_charge);
    constructor() public{
        createP("Paul", 12345, "Crescent");
        // createP("Archit", 34233, "Navale");
        // createP("Karthic", 2345, "Doc ock");
        // createP("Sam", 12345, "Opp");
    }

    function createP(string memory _text,int  _Phone,string memory _In_charge) public {
       
        Counter ++;
        
        patientsMap[Counter] = Patient(Counter,_text,_Phone,_In_charge);

        // patients.push(Patient({
        //     name: _text,
        //     Phone: _Phone,
        //     In_charge: _In_charge
        // }));

        // Patient memory patient1;
        // patient1.name = _text;
        // patient1.Phone = _Phone;
        // patient1.In_charge = _In_charge;

        // patients.push(patient1);
        emit PatCreated(Counter,_text,_Phone,_In_charge);


    }

  
    function get(uint _index) public view returns (string memory _text,int  _Phone,string memory _In_charge) {
        Patient storage patient1 = patientsMap[_index];
        return (patient1.name,patient1.Phone,patient1.In_charge);
    }

    // update text
    function update(uint _index, string memory _text,int  _Phone,string memory _In_charge) public {
        Patient storage patient1 = patientsMap[_index];
        patient1.name = _text;
        patient1.Phone = _Phone;
        patient1.In_charge = _In_charge;
    }

 }