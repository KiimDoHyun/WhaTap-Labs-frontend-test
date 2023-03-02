import styled from "styled-components";
import { dataSourceType, InformaticsChartPropsType } from "../../types/chart";
import InforMaticsBox from "./InformaticsChart/InforMaticsBox";

const InformaticsChart = ({ dataSource }: InformaticsChartPropsType) => {
    return (
        <InformaticsChartBox>
            {dataSource.map((item: dataSourceType) => (
                <InforMaticsBox key={item.key} item={item} />
            ))}
        </InformaticsChartBox>
    );
};

const InformaticsChartBox = styled.div`
    width: 100%;
    height: 100%;
    min-width: 100px;
    box-sizing: border-box;
    border-top: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
`;

export default InformaticsChart;
