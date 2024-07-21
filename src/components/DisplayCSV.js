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
                                    {row['大学名'] && row['大学名'] !== 'None' && (
                                        <p className="card-text"><span className="card-text-label">大学名：</span>{row['大学名']}</p>
                                    )}
                                    {row['都道府県'] && row['都道府県'] !== 'None' && (
                                        <p className="card-text"><span className="card-text-label">都道府県：</span>{row['都道府県']}</p>
                                    )}
                                    {row['活動内容'] && row['活動内容'] !== 'None' && (
                                        <p className="card-text"><span className="card-text-label">活動内容：</span>{row['活動内容']}</p>
                                    )}
                                    {row['設置区分'] && row['設置区分'] !== 'None' && (
                                        <p className="card-text"><span className="card-text-label">設置区分：</span>{row['設置区分']}</p>
                                    )}
                                    {row['X'] && row['X'] !== 'None' && (
                                        <p className="card-text"><span className="card-text-label">X：</span>{row['X']}</p>
                                    )}
                                    {row['HomePage'] && row['HomePage'] !== 'None' && (
                                        <p className="card-text"><span className="card-text-label">HomePage：</span>{row['HomePage']}</p>
                                    )}
                                    {row['学校コード'] && row['学校コード'] !== 'None' && (
                                        <p className="card-text"><span className="card-text-label">学校コード：</span>{row['学校コード']}</p>
                                    )}
                                    {row['設立年度'] && row['設立年度'] !== 'None' && (
                                        <p className="card-text"><span className="card-text-label">設立年度：</span>{row['設立年度']}</p>
                                    )}
                                    <h6 className='card-title2'>参加大会</h6>
                                    <ul className='invite_university'>
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