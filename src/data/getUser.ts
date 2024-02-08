export interface IUserInfo {
  name: string;
  role: "user" | "superadmin";
  companyIds: number[];
}

const REGULAR_USER: IUserInfo = {
  name: "Regular User",
  role: "user",
  companyIds: [1001],
};

const ADMIN_USER: IUserInfo = {
  name: "Super Admin User",
  role: "superadmin",
  companyIds: [1111, 2222, 3333, 4444],
};

/**
 * This function lets me pretend that I'm fetching a user
 * from the api, so that I can find out their role and company ids.
 */
export function getUser(role: "user" | "superadmin"): Promise<IUserInfo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(role === "user" ? REGULAR_USER : ADMIN_USER);
    }, 50);
  });
}
