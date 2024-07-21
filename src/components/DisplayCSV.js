import React, { useState } from 'react';
import './styles.css';

const DisplayCSV = ({ csvData, handleEdit, handleDelete }) => {
    const [searchQuery, setSearchQuery] = useState('');
    console.log(csvData)
    // 検索クエリが変更されたときの処理
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // 検索クエリに基づいてデータをフィルタリング
    const filteredData = csvData.filter(row =>
        (row['サークル名'] && row['サークル名'].includes(searchQuery)) ||
        (row['大学名'] && row['大学名'].includes(searchQuery)) ||
        (row['都道府県'] && row['都道府県'].includes(searchQuery)) ||
        (row['活動内容'] && row['活動内容'].includes(searchQuery)) ||
        (row['設置区分'] && row['設置区分'].includes(searchQuery)) 
    );

    return (
        <div>
            {/* 検索入力フォーム */}
            <div className="mb-3">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="さあ、検索しよう"
                    className="form-control-search"
                />
            </div>

            {/* フィルタリングされたデータを表示 */}
            <div className="d-flex flex-wrap">
                {filteredData.length > 0 ? (
                    filteredData.map((row, rowIndex) => (
                        <div className="col-md-4 mb-3" key={rowIndex}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{row['サークル名']}</h5>
                                    <p className="card-text">{row['大学名']}</p>
                                    <p className="card-text">{row['都道府県']}</p>
                                    <p className="card-text">{row['活動内容']}</p>
                                    <p className="card-text">{row['設置区分']}</p>
                                    <p className="card-text">{row['X']}</p>
                                    <p className="card-text">{row['HomePage']}</p>
                                    <p className="card-text">{row['学校コード']}</p>
                                    <p className="card-text">{row['設立年度']}</p>
                                    <h6 className='card-title2'>参加大会</h6>
                                    <ul>
                                        {['インカレ', '学ロボ', 'キャチロボ', 'ロボット相撲大会', 'ETロボコン', '知能ロボコン', '水中ロボコン', '海洋ロボコン', 'ひこロボ', '鳥人間コンテスト', '種コン', 'モデロケ全国大会', '能代宇宙イベント', 'ARLISS', 'ALL JAコンテスト', '学生フォーミュラ', 'エコラン', 'U-22 プログラミング', 'ICPC', 'SECCON', 'ISUCON', 'iGEM'].filter(competition => row[competition] === true || row[competition] === "True").map((competition) => (
                                            <li key={competition}>{competition}</li>
                                        ))}
                                    </ul>
                                    <button 
                                        className="btn-normal" 
                                        onClick={() => handleEdit(rowIndex)}
                                        aria-label={`Edit ${row['サークル名']}`}
                                    >
                                        編集
                                    </button>
                                    <button 
                                        className="btn-normal" 
                                        onClick={() => handleDelete(rowIndex)}
                                        aria-label={`Delete ${row['サークル名']}`}
                                    >
                                        削除
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>検索結果がありません。</p>
                )}
            </div>
        </div>
    );
};

export default DisplayCSV;