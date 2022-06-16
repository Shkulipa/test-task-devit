import "./search.css";
import { FormikHelpers, useFormik } from "formik";
import { Button, ErrorMsg, Input } from "..";
import { searchSchema } from "../../validation/search.schema";
import { IFormSearch, ISearchProps } from "./search.interfaces";

export function Search({ searchHandler, isLoading }: ISearchProps): JSX.Element {
  const formSearch = useFormik<IFormSearch>({
    initialValues: {
      search: "",
    },
    validationSchema: searchSchema,
    onSubmit,
  });

  // const [asdasd, setasdasd] = useState();

  function onSubmit(
    { search }: IFormSearch,
    { setSubmitting, resetForm }: FormikHelpers<IFormSearch>
  ) {
    searchHandler(search);
    setSubmitting(false);
    resetForm();
  }

  const errorSearch = formSearch.errors.search && formSearch.touched.search && 
    <ErrorMsg className='err-msg'>{formSearch.errors.search}</ErrorMsg>;

  return (
    <form onSubmit={formSearch.handleSubmit} className="search-form">
      <div className="search-wrapper">
        <Input 
          className={"search-input"}
          name="search"
          placeholder="Enter part of title or content..."
          type="text"
          onChange={formSearch.handleChange}
          value={formSearch.values.search}
        />
        {errorSearch}
      </div>
      <Button type="submit">
        {isLoading ? "isLoading..." : "Search" }
      </Button>
    </form>
  )
}
