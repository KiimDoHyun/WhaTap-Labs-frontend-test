import React from "react";
import styled from "styled-components";

interface ChartSvgPropsTYpe {
    svgRef: React.Ref<SVGSVGElement>;
}

const ChartSvg = ({ svgRef }: ChartSvgPropsTYpe) => {
    return (
        <ChartSvgBlock ref={svgRef}>
            <g className="y-axis" />
            <g className="x-axis" />
        </ChartSvgBlock>
    );
};

const ChartSvgBlock = styled.svg``;
export default React.memo(ChartSvg);
