import * as Yup from "yup";

export const signUpSchema = Yup.object({
    firstName: Yup.string().min(2).max(20).required("Please enter your name"),
    lastName: Yup.string().min(2).max(20).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    mobile: Yup.string()
      .required("Please enter your mobile number")
      .matches(/^\d{10}$/, "Mobile number must have 10 digits"),
    password: Yup.string().min(4).required("Please enter password"),
    confirmPassword: Yup.string()
      .required("Please confirm password")
      .oneOf([Yup.ref('password'), null], "Password doesn't match"),
  });



export const sellerFormValidation = Yup.object({
  country: Yup.string().max(20).required("Please enter your country"),
  language: Yup.string().max(20).required("Please enter your language"),
  phone: Yup.string()
    .required("Please enter your mobile number")
    .matches(/^\d{10}$/, "Mobile number must have 10 digits"),
    skills: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one feature"),
  desc: Yup.string().min(20).required("Please enter your About"),
});

export const profileValidation = Yup.object({
  username: Yup.string().min(4).max(20).required('Please enter your username'),
  country: Yup.string().max(20).required('Please enter your country'),
  github: Yup.string().required('Please enter your github'),
  linkedin: Yup.string().required('Please enter your linkedin'),
  language: Yup.string().min(4).max(20).required('Please enter your language'),
  phone: Yup.string()
    .required('Please enter your mobile no')
    .matches(/^\d{10}$/, 'Mobile no must have 10 digits'),
  // skills: Yup.array().of(Yup.string()).min(1, 'Please select at least one feature'),
  desc: Yup.string().min(20).required('Please enter your About'),
});





//   const { country, description } = details;
  //   if (country.trim() === "" || description.trim() === "") {
  //     setError("Country and description cannot be empty");
  //   } else if (description.length < 10) {
  //     setError("Description must be more than 10 characters");
  //   } else {
  //     const res = await BecomeSeller(details);
  //     if (res.data.updated) {
  //       dispatch(
  //         setSeller({
  //           isSeller: res.data.user.isSeller,
  //           country: res.data.user.country,
  //           desc: res.data.user.desc,
  //         })
  //       );
  //     }
  //   }
  // };