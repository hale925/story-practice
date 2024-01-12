import React, {useRef} from "react";
import { useForm } from "react-hook-form" 
import {
  Select,
  Button,
  MantineProvider,
  TextInput,
  Textarea,
  
  Group,
  Fieldset,
} from "@mantine/core";

function AddPosition(){
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
         // Pass data to the provided onSubmit function
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

            <Fieldset legend="Add Position" className="mb-6">
              <TextInput className="mt-2 block w-full"
                label="Position Name" 
                placeholder="Enter Position Name"
                {...register('name')} 
                error={errors.name}
                help={errors.name && 'Please provide Position Name'}/>
            
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
            
          <Textarea
            label="Job Description (optional)"
            placeholder="Enter the job description"
            rows={5}
            cols={100}
            className="mt-2 block w-full resize-y"
            {...register('jobDescription')}/>
    
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

}

export default AddPosition;
