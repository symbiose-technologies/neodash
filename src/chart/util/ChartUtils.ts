import html2canvas from 'html2canvas';

/**
 * Basic function to convert a table row output to a CSV file, and download it.
 * TODO: Make this more robust. Probably the commas should be escaped to ensure the CSV is always valid.
 */
export const downloadCSV = (rows) => {
    const element = document.createElement("a");
    let csv = "";
    const headers = Object.keys(rows[0]).slice(1);
    csv += headers.join(", ") + "\n";
    rows.forEach(row => {
        headers.forEach((header) => {
            // Parse value
            let value = row[header];
            if (value && value["low"]) {
                value = value["low"];
            }
            csv += JSON.stringify(value).replaceAll(",", ";");
            csv += (headers.indexOf(header) < headers.length - 1) ? ", " : "";
        });
        csv += "\n";
    });

    const file = new Blob([csv], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "table.csv";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}

/**
 * Replaces all global dashboard parameters inside a string with their values.
 * @param str The string to replace the parameters in.
 * @param parameters The parameters to replace.
 */
export function replaceDashboardParameters(str, parameters) {
    if (!str) return "";
    Object.keys(parameters).forEach(key => {
        str = str.replaceAll("$" + key, parameters[key] !== null ? parameters[key] : "");
    });
    return str;
}

/**
 * Downloads a screenshot of the element reference passed to it.
 * @param ref The reference to the element to download as an image.
 */
export const downloadComponentAsImage = async (ref) => {
    const element = ref.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
        link.href = data;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(data);
    }
};

export const getCurvature = (index, total) => {
    if (total <= 6) {
        // Precomputed edge curvatures for nodes with multiple edges in between.
        const curvatures = {
            0: 0,
            1: 0,
            2: [-0.5, 0.5],  // 2 = Math.floor(1/2) + 1
            3: [-0.5, 0, 0.5], // 2 = Math.floor(3/2) + 1
            4: [-0.66666, -0.33333, 0.33333, 0.66666], // 3 = Math.floor(4/2) + 1
            5: [-0.66666, -0.33333, 0, 0.33333, 0.66666], // 3 = Math.floor(5/2) + 1
            6: [-0.75, -0.5, -0.25, 0.25, 0.5, 0.75], // 4 = Math.floor(6/2) + 1
            7: [-0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75], // 4 = Math.floor(7/2) + 1
        }
        return curvatures[total][index];
    }
    const arr1 = [...Array(Math.floor(total / 2)).keys()].map(i => {
        return (i + 1) / (Math.floor(total / 2) + 1)
    })
    const arr2 = (total % 2 == 1) ? [0] : [];
    const arr3 = [...Array(Math.floor(total / 2)).keys()].map(i => {
        return (i + 1) / -(Math.floor(total / 2) + 1)
    })
    return arr1.concat(arr2).concat(arr3)[index];
}

export const update = (state, mutations) =>
    Object.assign({}, state, mutations)

export const unassign = (target, source) => {
    Object.keys(source).forEach(key => {
        delete target[key];
    });
};

export const merge = (oldData, newData, operation) => {
    if(operation){
        return Object.assign({}, newData,oldData);
    }
    unassign(oldData , newData);
    return oldData;
}