import React, {useRef} from "react";
import { useForm } from "react-hook-form";
//import axios from "axios";
import {
  Select,
  Button,
  MantineProvider,
  TextInput,
  Textarea,
  NumberInput,
  Group,
  Fieldset,
} from "@mantine/core";

const EmployeeForm = ({ initialValues, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: {
      fullName: {required: true, message: 'Please enter your Full Name',},
      email: {required: true, pattern: /^\S+@\S+$/, message: 'Invalid email address',},
      phoneNuber: {required: true, pattern: /^\d{10}$/, message: 'Please enter a 10-digit phone number',},
      parentId: { required: true, message: 'Please select a parent ID',},
      jobTitle: {required: true, message: 'Please enter the job title',},
      jobDescription: {message: 'Please provide a job description',},
      role: {message: 'Please describe the job role',},
      responsibilities: {message: 'Please list the job responsibilities',},
      requirements: {message: 'Please list the jpb requirements',},
    }
  });
  const formRef = useRef();

  const onSubmitHandler = (data) => {
    console.log("Submitted data:", data);
    onSubmit(data); // Pass data to the provided onSubmit function
  };

  const onClearForm = () => {
    reset();
    formRef.current.reset(); // Clear browser-cached values
  };

  

  return (
    <MantineProvider>
      <form 
       onSubmit={handleSubmit(onSubmitHandler)} 
       ref={formRef} 
       className="flex flex-col mx-auto px-4">
        <Fieldset legend="Personal Information" className="mb-6">
          <TextInput className="mt-2 block w-full"
            label="Employee FullName" 
            placeholder="Enter Employees FullName"
            {...register('fullName')} 
            error={errors.fullName}
            help={errors.fullName && 'Please provide your first name'}/>
        <TextInput className="mt-2 block w-full"
            label="Email"
            placeholder="Enter your email"
            {...register('email')}
            error={errors.email}
            help={errors.email && 'Please provide a valid email address'}/>
      <NumberInput className="mt-2 block w-full"
            label="Phone number"
            placeholder="Enter your phone number"
            {...register('phoneNumber')}
            error={errors.phoneNumber}
            help={errors.phoneNumber && 'Please enter a 10-digit phone number'}/>
      <Select className="mt-2 block w-full"
           label="Parent ID"
           placeholder="Select a parent ID"
           //data={parentIds}
           {...register('parentId')}
           required
           error={errors.parentId}
           helperText={errors.parentId && 'Please select a parent ID'}/>
      {/* <Combobox className="mt-2 block w-full"
        store={useCombobox()}
        withinPortal={false}
        label="Parent ID"
      >
        <Combobox.Target>
          <InputBase
            rightSection={<Combobox.Chevron />}
            placeholder="Select or search parent ID"
            onFocus={() => combobox.openDropdown()}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {parentIds.map((id) => (
              <Combobox.Option key={id} value={id}>
                {/* Display a user-friendly label for the parent ID */}
                {/* Example: <NumberInput value={id} /> */}
              {/* </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox> */} 
        </Fieldset>
        
        <Fieldset legend="Job Description" className="mb-6">
        <TextInput className="mt-2 block w-full"
            label="Job/Position Title"
            placeholder="Enter the job title"
            {...register('jobTitle')}
            error={errors.jobTitle}
            help={errors.jobTitle && 'Please provide the job title'}/>
      <Textarea
        label="Job Description (optional)"
        placeholder="Enter the job description"
        rows={5}
        cols={100}
        className="mt-2 block w-full resize-y"
        {...register('jobDescription')}/>
      <Textarea
        label="Job Role (optional)"
        placeholder="Describe the role"
        rows={3}
        cols={100}
        className="mt-2 block w-full resize-y"
        {...register('role')}/>
      <Textarea
        label="Job Responsibilities (optional)"
        placeholder="List the responsibilities"
        rows={5}
        cols={100}
        className="mt-2 block w-full resize-y"
        {...register('responsibilities')}/>
      <Textarea
        label="Job Requirements (optional)"
        placeholder="List the requirements"
        rows={5}
        cols={100}
        className="mt-2 block w-full resize-y"
        {...register('requirements')}/>

        </Fieldset>

        <Group position="right" className="mt-4">
          <Button 
            type="button" 
            color="gray" 
            onClick={onClearForm} className="mr-4">
            Clear
          </Button>
          <Button 
             type="submit" 
             className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Save
          </Button>
        </Group>
      </form>
    </MantineProvider>
  );
};

export default EmployeeForm;
