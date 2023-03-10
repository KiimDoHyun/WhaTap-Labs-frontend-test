import CurrentTime from "./CurrentTime";
import DatePickerArea from "./DatePickerArea";

interface TimeBlockPropsType {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    status: string;
}

const TimeBlock = ({ onClick, status }: TimeBlockPropsType) => {
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
