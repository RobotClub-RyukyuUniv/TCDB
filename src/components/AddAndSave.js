import React, { useState } from 'react';
import Axios from 'axios';

const AddAndSave = ({ csvData, setCsvData, editIndex, setEditIndex }) => {
    const [newRow, setNewRow] = useState({ 'サークル名': '', '大学': '' });
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddRow = () => {
        if (editIndex !== null) {
        const updatedData = [...csvData];
        updatedData[editIndex] = newRow;
        setCsvData(updatedData);
        setEditIndex(null);
        } else {
        setCsvData([...csvData, newRow]);
        }
        setNewRow({ 'サークル名': '', '大学': '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRow({ ...newRow, [name]: value });
    };

    const handleSave = async () => {
        try {
        const response = await Axios.post('http://127.0.0.1:5000/save', {
            data: JSON.stringify(csvData)
        });
        if (response.status === 200) {
            alert('データが保存されました');
        } else {
            alert('データの保存に失敗しました');
        }
        } catch (error) {
        console.error('Error saving data:', error);
        alert('データの保存中にエラーが発生しました');
        }
    };

    return (
        <div>
        <div className="add-edit-form">
            <h5>新しいサークルを追加または編集</h5>
            <div className="form-group">
            <label>サークル名</label>
            <input
                type="text"
                className="form-control"
                name="サークル名"
                value={newRow['サークル名']}
                onChange={handleInputChange}
            />
            </div>
            <div className="form-group">
            <label>大学</label>
            <input
                type="text"
                className="form-control"
                name="大学"
                value={newRow['大学']}
                onChange={handleInputChange}
            />
            </div>
            <button className="btn-normal" onClick={handleAddRow}>
            {editIndex !== null ? '行を更新' : '行を追加'}
            </button>
        </div>
        <button className="btn-custom-save mb-3" onClick={handleSave}>保存</button>
        </div>
    );
};

export default AddAndSave;