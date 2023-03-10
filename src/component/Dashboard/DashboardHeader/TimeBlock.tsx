import CurrentTime from "./CurrentTime";
import DatePickerArea from "./DatePickerArea";

const TimeBlock = ({ onClick, status }: any) => {
    return (
        <>
            {status === "NOW" ? (
                <CurrentTime onClick={onClick} />
            ) : (
                <DatePickerArea />
            )}
        </>
    );
};

export default TimeBlock;
