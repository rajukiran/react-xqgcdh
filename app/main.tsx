import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Grid,
  GridColumn as Column,
  GridSelectionChangeEvent,
  GridKeyDownEvent,
  getSelectedState,
  getSelectedStateFromKeyDown,
  GridSelectableMode,
} from '@progress/kendo-react-grid';

import products from './products.json';

// import { Checkbox, CheckboxChangeEvent, RadioGroup, RadioGroupChangeEvent } from '@progress/kendo-react-inputs';
import { getter } from '@progress/kendo-react-common';
import { Product } from './interfaces';

// interface selectionModesType {
//   value: GridSelectableMode | undefined,
//   label: string
// }

const DATA_ITEM_KEY = 'ProductID';
const SELECTED_FIELD = 'selected';
const idGetter = getter(DATA_ITEM_KEY);

// const selectionModes: selectionModesType[] = [
//   {value: 'single', label: 'Single selection mode'},
//   {value: 'multiple', label: 'Multiple selection mode'}
// ];

const App = () => {
  const [data, setData] = React.useState<Product[]>(
    products.map((dataItem: Product) =>
      Object.assign({ selected: false }, dataItem)
    )
  );
  const [selectedState, setSelectedState] = React.useState<{
    [id: string]: boolean | number[];
  }>({});
  // const [dragEnabled, setDragEnabled] = React.useState<boolean>(true);
  // const [cellEnabled, setCellEnabled] = React.useState<boolean>(true);
  // const [selectionMode, setSelectionMode] = React.useState<GridSelectableMode | undefined>(selectionModes[1].value);

  const onSelectionChange = (event: GridSelectionChangeEvent) => {
    const newSelectedState = getSelectedState({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    const prevRowKey = Object.keys(selectedState)[0];
    if (newSelectedState.hasOwnProperty(prevRowKey)) {
      newSelectedState[prevRowKey] = false;
    }
    newSelectedState[selectedState];
    setSelectedState(newSelectedState);
  };

  const onKeyDown = (event: GridKeyDownEvent) => {
    const newSelectedState = getSelectedStateFromKeyDown({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);
  };

  /* const onDragChange = (event: CheckboxChangeEvent) => {
    setDragEnabled(event.value);
  }

  const onCellChange = (event: CheckboxChangeEvent) => {
    console.log(event.value);
    setCellEnabled(event.value);
  } 

  const onSelectionModeChange = (event: RadioGroupChangeEvent) => {
    console.log(event.value);
    setSelectionMode(event.value);
  } */

  return (
    <div>
      {/* <Checkbox value={dragEnabled} label={'Enable drag selection'} onChange={onDragChange}/> */}
      {/* <Checkbox value={cellEnabled} label={'Enable cell selection'} onChange={onCellChange}/> */}
      {/* <RadioGroup value={selectionMode} onChange={onSelectionModeChange} data={selectionModes}/> */}
      <Grid
        style={{ height: '400px' }}
        data={data.map((item) => ({
          ...item,
          [SELECTED_FIELD]: selectedState[idGetter(item)],
        }))}
        dataItemKey={DATA_ITEM_KEY}
        selectedField={SELECTED_FIELD}
        selectable={{
          enabled: true,
          drag: false,
          cell: false,
          mode: 'single',
        }}
        navigatable={true}
        onSelectionChange={onSelectionChange}
        onKeyDown={onKeyDown}
      >
        <Column field="ProductName" title="Product Name" width="300px" />
        <Column field="UnitsInStock" title="Units In Stock" />
        <Column field="UnitsOnOrder" title="Units On Order" />
        <Column field="ReorderLevel" title="Reorder Level" />
      </Grid>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('my-app'));
