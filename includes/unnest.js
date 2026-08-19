function unnest_params(col_name, key, value_type) {
    const value_col = `${value_type}_value`
    return `(SELECT value.${value_col} FROM UNNEST(${col_name}) WHERE key = ${key})`
}