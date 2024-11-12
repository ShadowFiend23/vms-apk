import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AutoComplete from './AutoComplete';
import Input from './Input';
import Phone from './Phone';

const Company = ({ setFormValues, setSpinner }) => {
  const [companyContact, setCompanyContact] = useState('');
  const [companyContactPhone, setCompanyContactPhone] = useState('');
  const [selectedCompany, setSelectedCompany] = useState({
    company_name: "",
    floor: "",
    id: "",
    towerID: "",
    towerName: "",
    unit: ""
  });

  const onChangeInput = (val) => {
    setCompanyContact(val);
    everyChange();
  }

  const onChangePhone = (val) => {
    setCompanyContactPhone(val)
    everyChange();
  }

  const onSelectCompany = (val) => {
    setSelectedCompany({
      company_name: val.company_name,
      floor: val.floor,
      id: val.id,
      towerID: val.towerID,
      towerName: val.towerName,
      unit: val.unit
    });
    setSpinner(false);
  }

  const everyChange = () => {
    setFormValues({
      data: {
        companyInfo: selectedCompany,
        contactPerson: companyContact,
        contactPersonMobile: companyContactPhone
      }
    });
  }

  return (
    <View>
        <AutoComplete
          label={"Search Company"}
          onChangeValueHandler={onSelectCompany}
          setSpinner={setSpinner}
        />

        <Input
          label="Tower"
          placeholder="Tower"
          isDisabled={true}
          newValue={selectedCompany.towerName}
        />

        <Input
          label="Unit"
          placeholder="Unit"
          isDisabled={true}
          newValue={selectedCompany.unit}
        />
        
        <Input
          label="Contact person"
          placeholder="Contact person"
          newValue={companyContact}
          onChangeValue={onChangeInput}
        />

        <Phone 
          label="Contact person mobile number" 
          newValue={companyContactPhone}
          onChangeValue={onChangePhone}
        />
    </View>
  )
}

export default Company
