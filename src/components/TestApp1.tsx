import {Country} from "../interfaces/Country";
import {List} from "./List";
import {data} from "../data/data";

export const TestApp1 = () => (
  <>
    <List<Country>
      options={data}
      renderItem={(option) => <li key={option.id}>{option.title}</li>}
    />
  </>
);
