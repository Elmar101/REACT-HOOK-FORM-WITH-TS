import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";

let count = 0;

type FormValues = {
  username: string;
  email: string;
  emailTwo: string;
  channel: string;
  age: number;
  date: Date;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {number: string}[];
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
      age: 0,
      date: new Date(),
      social: {
        twitter: '',
        facebook: 'fb.com',
      },
      phoneNumbers: ['', ''],
      phNumbers: [{number: '' }]
    },
  });
  const { register, control, handleSubmit, formState, watch, getValues , setValue} = form;
  const { errors } = formState;

  //useFieldArray this hook take objects name and control keys this keys name from useForm's keys name and control keys useForm's control keys
  const { fields, append, remove } = useFieldArray({name: 'phNumbers', control});

  //watch -> watch() listens all form elements | watch('special form element of name') | watch(['name 1 of form elemnt','name 2 of form elemnt'']);
  // const watchAllFormElements = watch();
  const watchUserName = watch('username');
  const watchChanelAndAge = watch(['channel', 'age']);
  
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  useEffect(()=>{
    // does not be rerender componnet
    const subscription = watch((fieldValue)=>{
      console.log({effectFieldValue: fieldValue});
    });
    return ()=> subscription.unsubscribe();
  },[watch]);

 // getValues of params make like watch method of params
 // getValues() takes all values from form | getValues('special form element name') | getValues(['special form element name1', 'special form element name2'])
  const getValuesFromForm = () => {
    // does not be rerender componnet
    console.log("all form elemt value" ,getValues());
    console.log("one of form elemt value" ,getValues('username'));
    console.log("List of form elemt value" ,getValues(['username', 'channel']));
  }

  const setValueToFormElement = () => {
    setValue('social.facebook', '');
  };

  const setValueToFormElementWithShouldDirtyShouldTouchshouldValidate = () => {
    // rerender component
    setValue('social.facebook', '', {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  count++;
  return (
    <div>
      <h1>YouTube Form ({count})</h1>
      {/* <h2>watchAllFormElements: {JSON.stringify(watchAllFormElements)}</h2> */}
      <h2>watchUserName: {watchUserName}</h2>
      <h2>watchChanelAndAge: {watchChanelAndAge.toString()}</h2>

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

       <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true,
            required: { value: true, message: "Age is required" },
          })}
        />
        <p className="error">{errors.age?.message}</p>

        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          {...register("date", {
            valueAsDate: true,
            required: { value: true, message: "Date is required" },
          })}
        />
        <p className="error">{errors.date?.message}</p>

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

        <label htmlFor="facebook">Facebook</label>
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

        <div>
          <label htmlFor="channel">Phone Number List</label>
          {
            fields.map((field , index)=> (<div key={field.id}>
              <input type="text" id="ph-Number"
                {...register(`phNumbers.${index}.number` as const)}
              />
              { index > 0 && <button  type="button"  onClick={()=> remove(index)}> Remove </button> }
            </div>))
          }
        <button type="button" onClick={()=> append({number:''})}> Append </button>

        </div>


        <button type="submit">Submit</button> <br/>
        <button type="button" onClick ={getValuesFromForm} > getValues method take all value From Form</button><br/>
        <button type="button" onClick ={setValueToFormElement} > setValue method</button><br/>
        <button type="button" onClick={setValueToFormElementWithShouldDirtyShouldTouchshouldValidate}> 
          setValueToFormElementWithShouldDirtyShouldTouchshouldValidate 
        </button><br/>
      </form>

      <DevTool control={control} />
    </div>
  );
};