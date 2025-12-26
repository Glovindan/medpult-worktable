import { useCallback, useRef, useState } from "react";
import { ISearchTasksParams } from "../TasksList/TasksListTypes";
import Scripts from "../../../../shared/utils/clientScripts";

export function useTaskTypeSortFilters(
  setFilters: React.Dispatch<React.SetStateAction<ISearchTasksParams>>,
  isMyInteractions: boolean
) {
  
  const [usersFilter, setUsersFilter] = useState<string[] | undefined>();
  const lockUsersFilterChangeRef = useRef<boolean>(false);
  // Получение групп
  const getGroups = useCallback(
    () => isMyInteractions 
      // Для вкладки мих взаимодействий фильтровать по группам пользователя, 
      ? Scripts.getGroupsByUserGroups(usersFilter) 
      // Иначе не фильтровать
      : Scripts.getUserGroups(usersFilter),
    [usersFilter]
  );

  const [sortsFilter, setSortsFilter] = useState<string[] | undefined>();
  const lockSortsFilterChangeRef = useRef<boolean>(false);
  const getTypes = useCallback(
    () => Scripts.getTaskTypes(sortsFilter),
    [sortsFilter]
  );

  // Обработчик выбора групп
  const handleSelectGroups = async (groupsIds: string[]) => {
    if(!groupsIds.length) {
      setFilters((prev) => ({ ...prev, groups: [], groupIds: []}));
      setSortsFilter(undefined);
      lockUsersFilterChangeRef.current = false;
      return;
    }

    
    setFilters((prev) => ({ ...prev, groups: groupsIds, groupIds: groupsIds}));

    if(lockSortsFilterChangeRef.current) return;

    lockUsersFilterChangeRef.current = true;
    setSortsFilter(groupsIds);

    const users = await Scripts.getUsersInteraction(groupsIds);
    const usersIds = users.map(user => user.code);
    setFilters((prev) => ({ ...prev, users: usersIds, employeeIds: usersIds}));
  }
  
  // Обработчик выбора групп
  const handleSelectSorts = async (usersIds: string[]) => {
    if(!usersIds.length) {
      setFilters((prev) => ({ ...prev, users: [], employeeIds: []}));
      setUsersFilter(undefined);
      lockSortsFilterChangeRef.current = false;
      return;
    }

    setFilters((prev) => ({ ...prev, users: usersIds, employeeIds: usersIds}));

    if(lockUsersFilterChangeRef.current) return;

    lockSortsFilterChangeRef.current = true;
    setUsersFilter(usersIds);
  }

  const handleResetUserGroupsFilters = () => {
    lockSortsFilterChangeRef.current = false;
    lockUsersFilterChangeRef.current = false;

    setUsersFilter(undefined)
    setSortsFilter(undefined)
  }

  return {handleSelectSorts, handleSelectGroups, getTypes, getGroups, handleResetUserGroupsFilters}
}