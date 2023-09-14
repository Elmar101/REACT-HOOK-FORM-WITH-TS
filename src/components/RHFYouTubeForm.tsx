import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let count = 0;

type FormValues = {
  username: string;
  email: string;
  emailTwo: string;
  channel: string;
};

export const RHFYouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

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
            required: { value: true, message: "Username is required" },
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
              return fieldValue === 'elmar.amanov10@gmail.com' || "Enter corrected email adress"
            }
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

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};