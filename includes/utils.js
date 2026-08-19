function getLookbackDays() {
    return datafor.projectConfig.vars.lookback_days || 2; // Default to 2 if not set
}

function deleteIncremental(target_table, partition_col) {
    const days = getLookbackDays();
    return `DELETE FROM ${target_table} WHERE ${partition_col} >= DATE_SUB(CURRENT_DATE(), INTERVAL ${days} DAY)`;
}

function incrementalFilter(partition_col) {
    const days = getLookbackDays();
    if (partition_col.toUpperCase() === '_TABLE_SUFFIX') {
        return `AND PARSE_DATE('%Y%m%d', ${partition_col}) >= DATE_SUB(CURRENT_DATE(), INTERVAL ${days} DAY)`;
    }

    return `AND ${partition_col} >= DATE_SUB(CURRENT_DATE(), INTERVAL ${days} DAY)`;
}

module.exports = {
    deleteIncremental,
    incrementalFilter
}