import React, { useState } from 'react';
import './styles.css';

const DisplayCSV = ({ csvData, handleEdit, handleDelete }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // 検索クエリが変更されたときの処理
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // 検索クエリに基づいてデータをフィルタリング
    const filteredData = csvData.filter(row =>
        (row['サークル名'] && row['サークル名'].includes(searchQuery)) ||
        (row['大学'] && row['大学'].includes(searchQuery))
    );

    return (
        <div>
            {/* 検索入力フォーム */}
            <div className="mb-3">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="サークル名または大学で検索"
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
                                    <p className="card-text">{row['大学']}</p>
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
