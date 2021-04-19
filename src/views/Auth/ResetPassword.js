
import React from 'react';
import dataHero from "data-hero";
import {  Box, Flex, Heading, Stack, Text, FormControl, Input, FormLabel, FormErrorMessage } from '@chakra-ui/react';
const schema = {
    email: {
      email: true,
      min: 10,
      message: "A valid email is required",
    }, 
  };
const ResetPassword = () => {
    const [formState, setFormState] = useState({
        isValid: false,
        values: {
          email: ""
        },
        touched: {},
        errors: {},
      });
    
      useEffect(() => {
        const errors = dataHero.validate(schema, formState.values);
    
        setFormState((formState) => ({
          ...formState,
          isValid: errors.email.error ? false : true,
          errors: errors || {},
        }));
      }, [formState.values]);
    
      const handleChange = (event) => {
        event.persist();
    
        setFormState((formState) => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]:  event.target.value,
          },
          touched: {
            ...formState.touched,
            [event.target.name]: true,
          },
        }));
      };

  const hasError = (field) =>
  formState.touched[field] && formState.errors[field].error;
  
    return (
        <>
            <Flex>
                <Heading as="h4">
                    Reset password
                </Heading>
                <Text>ShowEnter the email associated with your account amd we'll send an email with instructions to reset your password.</Text>
            <Box as="form" mt="1" onSubmit={handleSignIn}>
            
          <Stack spacing={4} marginBottom="1rem">
            <FormControl isRequired  isInvalid={hasError("email")}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
               
                <Input
                  focusBorderColor="main.500"
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={formState.values.email || ""}
                  placeholder="Enter a valid email address"
                /> 
                <FormErrorMessage>
                {hasError("email")
                          ? formState.errors.email &&
                            formState.errors.email.message
                          : null}
                  </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              disabled={!formState.isValid}
              isLoading={logging}
              loadingText="Please wait.."
              variantColor="core.main"
            >
             Send instructions
            </Button>
</Stack>
            </Box>
            </Flex>
        </>
    );
};

export default ResetPassword;