import styled from "styled-components";
import { InformaticsChartBoxPropsType } from "../../../types/chart";

const InforMaticsBox = ({ item }: InformaticsChartBoxPropsType) => {
    return (
        <InforMaticsBoxBlock>
            <div className="title">{item.name}</div>
            <div className="value">{item.data || 0}</div>
        </InforMaticsBoxBlock>
    );
};

const InforMaticsBoxBlock = styled.div`
    border-bottom: 1px solid;
    padding: 8px;
    box-sizing: border-box;
    flex: 1;

    .title {
        font-size: 12px;
        margin-bottom: 10px;
    }

    .value {
        text-align: right;
    }
`;
export default InforMaticsBox;
