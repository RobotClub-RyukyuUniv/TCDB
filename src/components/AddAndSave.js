import React, { useState } from 'react';
import Axios from 'axios';
import './styles.css';

const AddAndSave = ({ csvData, setCsvData, editIndex, setEditIndex, fieldnames }) => {
    const initialRow = {
        'サークル名': '', '大学名': '', '都道府県': '', '活動内容': '', '設置区分': '国立', 'X': '', 'HomePage': '', '学校コード': '', '設立年度': '', 'インカレ': false, '学ロボ': false, 'キャチロボ': false, 'ロボット相撲大会': false, 'ETロボコン': false, '知能ロボコン': false, '水中ロボコン': false, '海洋ロボコン': false, 'ひこロボ': false, '鳥人間コンテスト': false, '種コン': false, 'モデロケ全国大会': false, '能代宇宙イベント': false, 'ARLISS': false, 'ALL JAコンテスト': false, '学生フォーミュラ': false, 'エコラン': false, 'U-22 プログラミング': false, 'ICPC': false, 'SECCON': false, 'ISUCON': false, 'iGEM': false
    };
    console.log(csvData)
    const [newRow, setNewRow] = useState(initialRow);

    const handleAddRow = () => {
        if (editIndex !== null) {
            const updatedData = [...csvData];
            updatedData[editIndex] = newRow;
            setCsvData(updatedData);
            setEditIndex(null);
        } else {
            setCsvData([...csvData, newRow]);
        }
        console.log("新しい行が追加されました:", newRow);
        setNewRow(initialRow);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewRow({ ...newRow, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSave = async () => {
        try {
            const response = await Axios.post('http://127.0.0.1:5000/save', {
                data: JSON.stringify(csvData),
                fieldnames: fieldnames
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
                        value={newRow['サークル名'] || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>大学名</label>
                    <input
                        type="text"
                        className="form-control"
                        name="大学名"
                        value={newRow['大学名'] || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>都道府県</label>
                    <input
                        type="text"
                        className="form-control"
                        name="都道府県"
                        value={newRow['都道府県'] || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>活動内容</label>
                    <input
                        type="text"
                        className="form-control"
                        name="活動内容"
                        value={newRow['活動内容'] || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>設置区分</label>
                    <select
                        className="form-control"
                        name="設置区分"
                        value={newRow['設置区分'] || '国立'}
                        onChange={handleInputChange}
                    >
                        <option value="国立">国立</option>
                        <option value="公立">公立</option>
                        <option value="私立">私立</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>X</label>
                    <input
                        type="text"
                        className="form-control"
                        name="X"
                        value={newRow['X'] || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>HomePage</label>
                    <input
                        type="text"
                        className="form-control"
                        name="HomePage"
                        value={newRow['HomePage'] || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>学校コード</label>
                    <input
                        type="text"
                        className="form-control"
                        name="学校コード"
                        value={newRow['学校コード'] || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>設立年度</label>
                    <input
                        type="text"
                        className="form-control"
                        name="設立年度"
                        value={newRow['設立年度'] || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <h5>参加大会</h5>
                {['インカレ', '学ロボ', 'キャチロボ', 'ロボット相撲大会', 'ETロボコン', '知能ロボコン', '水中ロボコン', '海洋ロボコン', 'ひこロボ', '鳥人間コンテスト', '種コン', 'モデロケ全国大会', '能代宇宙イベント', 'ARLISS', 'ALL JAコンテスト', '学生フォーミュラ', 'エコラン', 'U-22 プログラミング', 'ICPC', 'SECCON', 'ISUCON', 'iGEM'].map((competition) => (
                    <div className="form-group" key={competition}>
                        <label>
                            <input
                                type="checkbox"
                                name={competition}
                                checked={newRow[competition] || false}
                                onChange={handleInputChange}
                            />
                            {competition}
                        </label>
                    </div>
                ))}
                <button className="btn-normal" onClick={handleAddRow}>
                    {editIndex !== null ? '行を更新' : '行を追加'}
                </button>
            </div>
            <button className="btn-custom-save mb-3" onClick={handleSave}>保存</button>
        </div>
    );
};

export default AddAndSave;