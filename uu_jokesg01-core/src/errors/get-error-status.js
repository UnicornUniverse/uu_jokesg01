export function getErrorStatus(errorData) {
  // note: there were cases when errorData without reparsing
  // were not behaving like an object
  // const errorData = JSON.parse(JSON.stringify(props.errorData));
  let status = errorData?.status;

  if (status === null || status === undefined) {
    return errorData?.error?.status;
  } else {
    return status;
  }
}

export default getErrorStatus;
