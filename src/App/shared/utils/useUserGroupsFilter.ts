import { useCallback, useRef, useState } from "react";
import { ISearchInteractionsParams } from "../../components/WorkTable/InteractionsList/InteractionsListTypes";
import Scripts from "./clientScripts";
import { ISearchTasksParams } from "../../components/WorkTable/TasksTab/TasksList/TasksListTypes";

// ISearchInteractionsParams | ISearchTasksParams
export function useUserGroupsFilter<T = ISearchInteractionsParams>(
  setFilters: React.Dispatch<React.SetStateAction<T>>,
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

  const [groupsFilter, setGroupsFilter] = useState<string[] | undefined>();
  const lockGroupsFilterChangeRef = useRef<boolean>(false);
  // Получение сотрудников
  const getUsers = useCallback(
    () => Scripts.getUsersInteraction(groupsFilter),
    [groupsFilter]
  );

  // Обработчик выбора групп
  const handleSelectGroups = async (groupsIds: string[]) => {
    if(!groupsIds.length) {
      setFilters((prev) => ({ ...prev, groups: [], groupIds: []}));
      setGroupsFilter(undefined);
      lockUsersFilterChangeRef.current = false;
      return;
    }

    
    setFilters((prev) => ({ ...prev, groups: groupsIds, groupIds: groupsIds}));

    if(lockGroupsFilterChangeRef.current) return;

    lockUsersFilterChangeRef.current = true;
    setGroupsFilter(groupsIds);

    const users = await Scripts.getUsersInteraction(groupsIds);
    const usersIds = users.map(user => user.code);
    setFilters((prev) => ({ ...prev, users: usersIds, employeeIds: usersIds}));
  }
  
  // Обработчик выбора групп
  const handleSelectUsers = async (usersIds: string[]) => {
    if(!usersIds.length) {
      setFilters((prev) => ({ ...prev, users: [], employeeIds: []}));
      setUsersFilter(undefined);
      lockGroupsFilterChangeRef.current = false;
      return;
    }

    setFilters((prev) => ({ ...prev, users: usersIds, employeeIds: usersIds}));

    if(lockUsersFilterChangeRef.current) return;

    lockGroupsFilterChangeRef.current = true;
    setUsersFilter(usersIds);
  }

  const handleResetUserGroupsFilters = () => {
    lockGroupsFilterChangeRef.current = false;
    lockUsersFilterChangeRef.current = false;

    setUsersFilter(undefined)
    setGroupsFilter(undefined)
  }

  return {handleSelectUsers, handleSelectGroups, getUsers, getGroups, handleResetUserGroupsFilters}
}