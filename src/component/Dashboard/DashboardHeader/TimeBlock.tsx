import CurrentTime from "./CurrentTime";
import DatePickerArea from "./DatePickerArea";

interface PropsType {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    status: string;
}

const TimeBlock = ({ onClick, status }: PropsType) => {
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
