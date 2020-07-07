import * as React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  vin: string
};

export default function App() {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  const [vininfo, setVinInfo] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const onSubmit = handleSubmit(({vin}) => {
    let url = `/api/vinfetch/${vin}`;
    console.log('URL: ' + url);

    fetch(url)
    .then(res => res.json())
    .then(result => {
      if (result.Results) {
        setVinInfo(result.Results.map(item => <li key={item.VariableId}>{item.Value} {item.ValueId} {item.Variable} {item.VariableId}</li>))
      }
      if (result.Message) {
        setMessage(result.Message);
      }
      })
    .catch(error => {
      console.log(error);
      setMessage(error.message);
      setVinInfo(null);
    });
  });

    return(
      <main>
      <div>
        <label>{message}</label>
      </div>
      <br></br>
      <form onSubmit={onSubmit}>
        <label>
          VIN:
          <input name="vin" ref={register({ required: true })} />
          {errors.vin && <span>This field is required</span>}
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        <ul>
          {vininfo}
        </ul>
      </div>
      </main>
    );
}