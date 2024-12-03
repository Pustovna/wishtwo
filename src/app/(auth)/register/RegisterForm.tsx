"use client";
import React, { use, useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterSchema, registerSchema } from "@/lib/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpUser } from "@/app/actions/authActions";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await signUpUser(data);

    if (result.status === "success") {
      console.log("success");
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e: any) => {
          console.log("e: ", e);
          const fieldName = e.path.join(".") as "email" | "password" | "name";
          setError(fieldName, { message: e.message });
        });
      } else {
        toast.error(result.error as string);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            label="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <Button
            variant="contained"
            color={isValid ? "primary" : "error"}
            fullWidth
            type={"submit"}
            sx={{ mt: 2 }}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
