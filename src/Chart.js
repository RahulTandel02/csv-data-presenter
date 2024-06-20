import { useContext, useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import moment from 'moment';
import { fetchData, fetchDataMSRP } from './actions';
import MyContext from './contex';
import { useDispatch } from 'react-redux';

function Chart(props) {
    useLayoutEffect(() => {
        let root = am5.Root.new(props.id);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panY: false,
                layout: root.verticalLayout,
            })
        );


        // Define data
        let data = props.data

        // console.log(data)

        // Create Y-axis
        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        let xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 10,
        })

        xRenderer.labels.template.setAll({
            rotation: -45
        })

        // Create X-Axis
        let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                renderer: xRenderer,
                categoryField: "label",
            })
        );

        // let label = am5xy.CategoryAxis.renderer.labels.template

        xAxis.data.setAll(data);

        // Create series
        let series1 = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Series",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                categoryXField: "label",

            })
        );
        series1.data.setAll(data);

        // Add legend
        let legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);

        // Add cursor
        // chart.set("cursor", am5xy.XYCursor.new(root, {}));

        return () => {
            root.dispose();
        };
    }, [props.data]);

    const { filterData, setfilterData } = useContext(MyContext)
    const dispatch = useDispatch()

    function handleChange(condition) {
        if (props.id === "chartdiv") {
            dispatch(fetchData({ ...filterData, condition }))
        } else {
            dispatch(fetchDataMSRP({ ...filterData, condition }))
        }
    }

    return (
        <>
            <button className='btn btn-primary' onClick={() => handleChange('new')} >New</button>
            <button className='btn btn-primary mx-2' onClick={() => handleChange('used')}>Used</button>
            <button className='btn btn-primary' onClick={() => handleChange('cpo')}>CPO</button>
            <div className='mt-4'>
                <div id={props.id} style={{ width: "100%", height: "500px" }}></div>
            </div>
        </>
    );
}
export default Chart;