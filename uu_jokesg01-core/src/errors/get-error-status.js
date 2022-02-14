export function getErrorStatus(errorData) {
  let status = errorData?.status;

  if (status === null || status === undefined) {
    return errorData?.error?.status;
  } else {
    return status;
  }
}

export default getErrorStatus;
