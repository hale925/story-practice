import React from 'react';
import { useForm, useRef} from "react-hook-form"

function AddEmployee() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: {
      name: {required: true, message: 'Please enter the job title',},
      description: {message: 'Please provide a job description',},
      parentId: { required: true, message: 'Please select a parent ID',}, 
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

return <div>
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
</div>
}
export default AddEmployee;
