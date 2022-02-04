import {Spin} from 'antd';

const Spinner = () => {
    return (
        <div style={spinnerStyle}>
            <Spin size='large' tip='Loading...'/>
        </div>
    );
};

export default Spinner;

const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
    width: "100%",
    padding: "5%",
    position: "relative"
}
