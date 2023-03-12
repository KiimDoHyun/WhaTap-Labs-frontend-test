import { ListGroup } from "react-bootstrap";
import styled from "styled-components";

interface listItemType {
    key: string;
    name: string;
}

interface PropsType {
    title: string;
    listItem: listItemType[];
    selectedListItem: string[];
    setSelectedListItem: React.Dispatch<React.SetStateAction<any[]>>;
    isMultiSelect: boolean;
}

const WidgetPropsList = ({
    title,
    listItem,
    selectedListItem,
    setSelectedListItem,
    isMultiSelect = false,
}: PropsType) => {
    const onClickList = (clickItem: string) => {
        setSelectedListItem((prevState: any) => {
            if (isMultiSelect) {
                const filterd = prevState.filter(
                    (filterItem: any) => filterItem !== clickItem
                );

                if (filterd.length === prevState.length) {
                    return [...prevState, clickItem];
                } else return filterd;
            } else {
                setSelectedListItem([clickItem]);
            }
        });
    };
    return (
        <>
            <h2>{title}</h2>
            <ListBox>
                <ListGroup>
                    {listItem.map((item: any) => (
                        <ListGroup.Item
                            key={item.key}
                            action
                            active={selectedListItem.some(
                                (findItem: any) => findItem === item.key
                            )}
                            onClick={() => onClickList(item.key)}
                        >
                            {item.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </ListBox>
        </>
    );
};

const ListBox = styled.div`
    height: 500px;
    overflow-y: auto;
`;
export default WidgetPropsList;
