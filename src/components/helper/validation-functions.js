import { isEmail } from "validator";


const required = value => {
    if (!value) {
        return (
            <p className="text-danger">
                This Field is required.
            </p>

        );
    }
};

const validEmail = value => {
    if (!isEmail(value)) {
        return (
            <p className="text-danger">
                This is not a valid email.
            </p>
        );
    }
};

export {
    required,
    validEmail
}