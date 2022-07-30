import api from '@api'

export default {

    state:{
        salaries: [],
        imports: [],
        exports: []
    },

    actions:{
        getSalaries({commit}, payload){
            commit("Set_Main_Loading", true);
            var queryString = "?";
            if(payload != null){
                if(payload.year != null){
                    queryString += `year=${payload.year}`
                }
                if(payload.month != null){
                    if(queryString.length > 1)
                        queryString += "&"
                    queryString += `month=${payload.month}`
                }
                if(payload.search != null){
                    if(queryString.length > 1)
                        queryString += "&"
                    queryString += `search=${payload.search}`
                }
            }

            var url = `Payment/GetSalaries${queryString}`;
            api.get(url, ({data}) => {
                commit('Get_Salaries', data);
                commit("Set_Main_Loading", false);
            }, { success: "Ok", error: "Error"})
        },
        getImports({commit}, payload){
            commit("Set_Main_Loading", true);
            var queryString = "?";
            if(payload != null){
                if(payload.year != null){
                    queryString += `year=${payload.year}`
                }
                if(payload.month != null){
                    if(queryString.length > 1)
                        queryString += "&"
                    queryString += `month=${payload.month}`
                }
                if(payload.search != null){
                    if(queryString.length > 1)
                        queryString += "&"
                    queryString += `search=${payload.search}`
                }
            }
            var url = `Payment/GetImports${queryString}`;
            api.get(url, ({data}) => {
                commit('Get_Imports', data);
                commit("Set_Main_Loading", false);
            }, { success: "Ok", error: "Error"})
        },
        getExports({commit}, payload){
            commit("Set_Main_Loading", true);
            var queryString = "?";
            if(payload != null){
                if(payload.year != null){
                    queryString += `year=${payload.year}`
                }
                if(payload.month != null){
                    if(queryString.length > 1)
                        queryString += "&"
                    queryString += `month=${payload.month}`
                }
                if(payload.search != null){
                    if(queryString.length > 1)
                        queryString += "&"
                    queryString += `search=${payload.search}`
                }
            }
            var url = `Payment/GetExports${queryString}`;
            api.get(url, ({data}) => {
                commit("Set_Main_Loading", false);
                commit('Get_Exports', data);
            }, { success: "Ok", error: "Error"})
        },

        addSalary({ commit }, payload){
            api.post('Payment/Add', payload.dto, ({data}) => {
                commit('Add_Salary', data)
                payload.cb();
            });
        },
        import({ commit }, payload){
            api.post('Payment/Import', payload.dto, ({data}) => {
                commit('Add_Import', data)
                payload.cb();
            });
        },
        export({ commit }, payload){
            api.post('Payment/Export', payload.dto, ({data}) => {
                commit('Add_Export', data)
                payload.cb();
            });
        },

        getPayment(ctx, payload){
            api.get('Payment/GetById?id=' + payload.id, payload.cb, { success: "Ok", error: "Error"})
        },

        updatePayment({ commit }, payload){
            api.put('Payment/Update', payload.dto, ({data}) => {
                commit('Update_Payment', payload)
                payload.cb();
            });
        },

        deletePayment({ commit }, paylaod){
            api.delete('Payment/Delete?id=' + paylaod.id, () => {
                commit('Delete_Payment', paylaod)
            });
        }
    },

    mutations:{
        Get_Salaries(state, payload){
            state.salaries = payload;
        },

        Get_Imports(state, payload){
            state.imports = payload;
        },

        Get_Exports(state, payload){
            state.exports = payload;
        },

        Add_Salary(state, payload){
            state.salaries.push(payload);
        },
        Add_Export(state, payload){
            state.exports.push(payload);
        },
        Add_Import(state, payload){
            state.imports.push(payload);
        },

        Update_Payment(state, payload){
            if(payload.type == "salary"){
                state.salaries[state.salaries.findIndex(c => c.id == payload.dto.id)].note = payload.dto.note;
                state.salaries[state.salaries.findIndex(c => c.id == payload.dto.id)].amount = payload.dto.amount;
                state.salaries[state.salaries.findIndex(c => c.id == payload.dto.id)].date = payload.dto.date;
            }
            else if(payload.type == "import"){
                state.imports[state.imports.findIndex(c => c.id == payload.dto.id)].note = payload.dto.note;
                state.imports[state.imports.findIndex(c => c.id == payload.dto.id)].amount = payload.dto.amount;
                state.imports[state.imports.findIndex(c => c.id == payload.dto.id)].date = payload.dto.date;
            }
            else if(payload.type == "export"){
                state.exports[state.exports.findIndex(c => c.id == payload.dto.id)].note = payload.dto.note;
                state.exports[state.exports.findIndex(c => c.id == payload.dto.id)].amount = payload.dto.amount;
                state.exports[state.exports.findIndex(c => c.id == payload.dto.id)].date = payload.dto.date;
            }
            
        },

        Delete_Payment(state, payload){
            if(payload.type == "salary"){
                state.salaries.splice(state.salaries.findIndex(c => c.id == payload.id) , 1);
            }
            else if(payload.type == "import"){
                state.imports.splice(state.imports.findIndex(c => c.id == payload.id) , 1);
            }
            else if(payload.type == "export"){
                state.exports.splice(state.exports.findIndex(c => c.id == payload.id) , 1);
            }
        }
    }


}