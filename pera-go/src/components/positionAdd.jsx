import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Combobox, InputBase, Button, MantineProvider, TextInput, Textarea, Group, Fieldset } from "@mantine/core";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPositionsAsync, createPositionAsync } from './positionSlice';

function AddPosition() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: {
      name: { required: true, message: 'Please enter the job title', },
      description: { message: 'Please provide a job description', },
      parentId: { required: true, message: 'Please select a parent ID', },
    }
  });

  const formRef = useRef();
  const dispatch = useDispatch();
  const parentIds = useSelector((state) => state.positions.positions.map(pos => pos.name));

  const onSubmitHandler = async (data) => {
    try {
      // Dispatch the createPositionAsync action to create a new position
      await dispatch(createPositionAsync(data));
      // Optionally, you can refetch positions to update the list after creating a new one
      await dispatch(fetchPositionsAsync());
      console.log("New position created successfully!");
    } catch (error) {
      console.error('Error creating position:', error);
    }
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
            help={errors.name && 'Please provide Position Name'} />

          <Combobox className="mt-2 block w-full"
            label="Parent ID"
            placeholder="Select a parent ID"
            {...register('parentId')}
            required
            error={errors.parentId}
            helperText={errors.parentId && 'Please select a parent ID'}
          >
            <Combobox.Target>
              <InputBase
                rightSection={<Combobox.Chevron />}
                placeholder="Select or search parent ID"
              />
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Options>
                {parentIds.map((parentId) => (
                  <Combobox.Option key={parentId} value={parentId}>
                    {parentId}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
        </Fieldset>

        <Fieldset legend="Job Description" className="mb-6">
          <Textarea
            label="Job Description (optional)"
            placeholder="Enter the job description"
            rows={5}
            cols={100}
            className="mt-2 block w-full resize-y"
            {...register('jobDescription')} />
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
