import FlatList from 'flatlist-react';
import { useCallback, useState } from 'react';
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
export default function DataTable({ rowData, columnData, onRowClick }) {
    const styles = {
        td: {
            textAlign: 'left',
            border: '1px solid #ccc',
            borderCollapse: 'collapse',
            padding: '10px'
        },
        link: {
            color: '#4169e1',
            textTransform: 'capitalize'
        },
        thumbnailImage: {
            height: '100px'
        }
    }

    const [sorted, setSorted] = useState(false);
    const [headCheckboxChecked, setHeadCheckboxChecked] = useState(false);

    const sort = useCallback((id) => {
        onRowClick(id, sorted);
        setSorted(!sorted);
    }, [onRowClick, sorted]);

    const handleCheckboxClick = useCallback(() => {
        setHeadCheckboxChecked(!headCheckboxChecked);
        const allCheckboxes = document.getElementsByClassName('rowCheckbox');
        for(let i = 0; i < allCheckboxes.length; i++){
            allCheckboxes[i].checked = !headCheckboxChecked;
        }
    }, [headCheckboxChecked]);
    
    const renderList = (row, index) => {
        return (
            <tr key={index}>
                <td style={styles.td}><input type="checkbox" className="rowCheckbox" /></td>
                <td style={styles.td}><a style={styles.link} href={row.url} title={row.title}>{row.title}</a></td>
                <td style={styles.td}><img style={styles.thumbnailImage} placeholder="Image" alt={row.title} src={row.thumbnailUrl} /></td>
            </tr>
        );
    }

    return (
        <div>
        <table style={styles.td}>
          <thead>
            <tr>
                {columnData.length > 0 && rowData.length > 0 && columnData.map((val, key) => {
                return (
                    <th key={key} style={Object.assign({}, styles.td, {width: val.width})} align={val.numeric ? 'right' : 'left'}>
                        { val.id === 'checkbox' ? 
                            <input type="checkbox" checked={headCheckboxChecked} onChange={handleCheckboxClick} /> : (
                                <span>{val.label} {val.isSortable && 
                                <a href="#" onClick={() => sort(val.id)}>
                                    { sorted ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}</a>
                                }</span>
                            )
                        }
                    </th>
                )
                })}
            </tr>
          </thead>
          <tbody>
                <FlatList
                    list={rowData}
                    renderItem={renderList}
                    renderWhenEmpty={() => <tr>List is empty!</tr>} />
          </tbody>
        </table>
        </div>
    );
    
}