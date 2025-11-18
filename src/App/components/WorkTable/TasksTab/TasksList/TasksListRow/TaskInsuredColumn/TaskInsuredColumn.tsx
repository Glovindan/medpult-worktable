import React from "react";
import { InsuredData, PolicyCategory } from "../../TasksListTypes";

type TaskInsuredColumnProps = {
  /** Данные застрахованного */
  insuredData: InsuredData;
};

function usePolicyCategoryIcon(policyCategory?: PolicyCategory) {
	const getPolicyCategoryIconColor = () => {
		switch(policyCategory) {
			case PolicyCategory.gold: return "#EFBF04"
			case PolicyCategory.platinum: return "#847E7D"
			default: return "#B1B1B1"
		}
	}

	const getPolicyCategoryIcon = () => {
		if(policyCategory == undefined) return null

		const iconColor = getPolicyCategoryIconColor();

		return (
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.10886 0.270117C7.29541 -0.0896727 7.81006 -0.0896717 7.99661 0.270118L10.6638 5.4141L14.2874 2.44932C14.6692 2.13697 15.2247 2.50752 15.083 2.97998L12.7665 10.7014C12.6396 11.1244 12.2503 11.4141 11.8087 11.4141H3.29677C2.85516 11.4141 2.46583 11.1244 2.33894 10.7014L0.0225084 2.97998C-0.119228 2.50752 0.436284 2.13697 0.818042 2.44932L4.44162 5.4141L7.10886 0.270117Z"
          fill={iconColor}
        />
      </svg>
    );
	}

	const getPolicyCategoryName = () => {
		if(policyCategory == undefined) return "";

		switch(policyCategory) {
			case PolicyCategory.gold: return "Gold"
			case PolicyCategory.platinum: return "Platinum"
			default: return "Silver"
		}
	}

	const policyCategoryName = getPolicyCategoryName()
	const policyCategoryIcon = getPolicyCategoryIcon();

	return {policyCategoryIcon, policyCategoryName}
}

/** Колонка застрахованного */
export default function TaskInsuredColumn({insuredData}: TaskInsuredColumnProps) {

	const {policyCategoryIcon, policyCategoryName} = usePolicyCategoryIcon(insuredData.policyCategory)
	
	return (
    <div className="task-insured-column">
        <div className="task-insured-column__first-row" title={insuredData.fullName}>{insuredData.fullName}</div>
        <div className="task-insured-column__second-row">
					<span className="task-insured-column__policy-category" title={policyCategoryName}>{policyCategoryIcon}</span>
					<span className="task-insured-column__policy-number" title={insuredData.policyNumber}>{insuredData.policyNumber}</span>
				</div>
    </div>
  );
}
