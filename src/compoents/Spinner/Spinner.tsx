import { ClipLoader } from 'react-spinners';

// Define a functional 'Spinner' that takes in 'props' of type 'any'
const Spinner = (props: any) => {
    // Destructure the 'loading' property from the 'props' object
    const { loading } = props;
    // Return ClipLoader component
    return (
        <ClipLoader
            // size={100}
            // color={'#000000'}
            loading={loading}
        />
    );
};
// Export the Spinner component as the default export
export default Spinner;
