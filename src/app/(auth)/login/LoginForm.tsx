"use client";
import React from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginSchema, loginSchema } from "@/lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { Input } from "./../Form.style";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const router = useRouter();
  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);

    if (result.status === "success") {
      router.push("/profile");
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };

  return (
    <Container maxWidth="sm" >
      <Box  display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          {/* <Box display="flex" flexDirection="column" >
            <FormControl error={!!errors.email} variant="outlined">
              <InputLabel htmlFor="email">email</InputLabel>
              <Input
                id="email"
                aria-describedby="email"
                {...register("email")}
              />
              <FormHelperText id="email">
                {errors.email?.message}
              </FormHelperText>
            </FormControl>

            <FormControl error={!!errors.password} variant="outlined">
              <InputLabel htmlFor="password">password</InputLabel>
              <Input
                id="password"
                aria-describedby="password"
                {...register("password")}
              />
              <FormHelperText id="password">
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
          </Box> */}

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
            color="primary"
            fullWidth
            type={"submit"}
            sx={{ mt: 2 }}
            disabled={!isValid}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
