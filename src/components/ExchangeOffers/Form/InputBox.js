import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormFeedback, Fade } from "reactstrap";

const InputBox = ({
  type,
  placeholder,
  onChangeInput,
  value,
  label,
  error,
  errorMessage,
  flexFlow,
  labelProps,
  inputStyleProps,
  accept
}) => {
  const inputProps = {
    type,
    value,
    placeholder,
    onChange: onChangeInput,
    accept
  };
  if (error) inputProps.valid = false;
  return (
    <FormGroup style={{ marginBottom: type === "file" ? "5px" : "15px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          marginBottom: "5px"
        }}
      >
        <Label for={label} {...labelProps} style={{ marginBottom: "10px" }}>
          {label}
        </Label>
        <Input
          {...inputProps}
          style={
            type === "file"
              ? {}
              : {
                  padding: "15px",
                  border: "1px solid hsl(0,0%,80%)",
                  borderRadius: "4px"
                }
          }
        />
      </div>
      <FormFeedback className="text-left">
        <Fade in={error} style={{ color: "#dc4c3a" }}>
          {errorMessage}
        </Fade>
      </FormFeedback>
    </FormGroup>
  );
};

InputBox.defaultProps = {
  errorMessage: "",
  flexFlow: "inherit",
  labelProps: {},
  inputStyleProps: {},
  accept: ""
};

InputBox.propTypes = {
  type: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  flexFlow: PropTypes.string,
  labelProps: PropTypes.objectOf(PropTypes.any),
  inputStyleProps: PropTypes.objectOf(PropTypes.any),
  accept: PropTypes.string
};

export default InputBox;
