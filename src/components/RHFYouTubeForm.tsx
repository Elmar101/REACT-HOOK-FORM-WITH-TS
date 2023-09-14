import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";

let count = 0;

type FormValues = {
  username: string;
  email: string;
  emailTwo: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
};

export const RHFYouTubeForm = () => {
  // const form = useForm<FormValues>({
  //    defaultValues: async() => {
  //     const data = (await axios.get("https://jsonplaceholder.typicode.com/users/1")).data; 
  //      return {
  //       email: data.email,
  //       username: data.name,
  //       channel: '',
  //       emailTwo: ''
  //      }
  //    },
  // });

  const form = useForm<FormValues>({
    defaultValues:{
      username: '',
      email: '',
      emailTwo: '',
      channel: '',
      social: {
        twitter: '',
        facebook: '',
      },
      phoneNumbers: ['', '']
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  console.log("Errors", errors);
  
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  count++;
  return (
    <div>
      <h1>YouTube Form ({count})</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: { 
              value: true, 
              message: "Username is required" 
            },
          })}
        />
        <p className="error">{errors.username?.message}</p>

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            validate: (fieldValue) => {
              console.log({fieldValue});
              return fieldValue === 'Sincere@april.biz' || "Enter corrected email adress"
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="emailTwo">E-mail Two</label>
        <input
          type="email"
          id="email"
          {...register("emailTwo", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email Two format",
            },
            validate: {
              // noAdmin: (fieldValue) => fieldValue === 'elmar.amanov10@gmail.com' || "Enter corrected admin email adress",
              badDomain: (fieldValue) => fieldValue.endsWith("gmail.com") || "Bad Domain dont supported",
            }
          })}
        />
        <p className="error">{errors.emailTwo?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: { value: true, message: "Channel is required" },
          })}
        />
        <p className="error">{errors.channel?.message}</p>

        <label htmlFor="channel">Twitter</label>
        <input
          type="text"
          id="twitter"
          {...register("social.twitter",{
            required: {
              value: true,
              message: 'Enter Twittter Proffile Link'
            }
          })}
        />

        <p className="error">{errors.social?.twitter?.message}</p>

        <label htmlFor="channel">Facebook</label>
        <input
          type="text"
          id="facebook"
          {...register("social.facebook", {
            validate: (fieldValue)=> fieldValue !=='' || "Enter Facebook Proffile Link"
          })}
        />

        <p className="error">{errors.social?.facebook?.message}</p>

        <label htmlFor="channel">Primary Phone number</label>
        <input
          type="text"
          id="primary-phone"
          {...register("phoneNumbers.0",{
            validate:{
              minLength: (fieldValue)=> fieldValue.length > 9 || "At Least 10 characters",
              maxLength : (fieldValue) =>  fieldValue.length < 11 || "Max Length 10"
            }
          })}
        />

        <p className="error">{errors.phoneNumbers?.[0]?.message}</p>


        <label htmlFor="channel">Secondary Phone number</label>
        <input
          type="text"
          id="secondary-phone"
          {...register("phoneNumbers.1", {
            minLength: {
              value: 10,
              message: 'At Least 10 characters'
            },
            maxLength: {
              value: 10,
              message: "Max Length 10"
            }
          })}
        />

        <p className="error">{errors.phoneNumbers?.[1]?.message}</p>


        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};