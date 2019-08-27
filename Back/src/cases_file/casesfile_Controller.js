import uuidv4 from "uuid/v4";

import contactsFile from "../ContactFile_Schema";

const initCaseFiles = async () => {
  const addCaseFile = async (id, props) => {
    const { caseTitle, messageType, status, dateCreated } = props;
    if (!caseTitle || !messageType || !status || !dateCreated) {
      throw new Error(
        "you didn't provide with the full input for creating a case"
      );
    }

    try {
      const createCase = await contactsFile.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            cases: {
              caseId: uuidv4(),
              caseTitle,
              messageType,
              status,
              dateCreated,
              logs: []
            }
          }
        }
      );

      return createCase;
    } catch (err) {
      throw new Error("creating a case failed");
    }
  };

  const deleteCaseFile = async (fileID, caseID) => {
    if (!fileID || !caseID) {
      throw new Error("you did not provide with CaseID or fileID");
    }

    try {
      const deleteCase = await contactsFile.findByIdAndUpdate(
        { _id: fileID },
        { $pull: { cases: { caseId: caseID } } }
      );
      return deleteCase;
    } catch (err) {
      throw new Error(`Case with id = ${id} did not get deleted`);
    }
  };

  const updateCase = async (fileID, caseID, props) => {
    if (!fileID || !caseID) {
      throw new Error("you did not provide with fileID or caseID");
    }

    try {
      const updateCase = await contactsFile.findByIdAndUpdate(
        { _id: fileID },
        props
      );
      return updateCase;
    } catch (err) {
      throw new Error("Case file did not get updated");
    }
  };

  const controller = {
    addCaseFile,
    deleteCaseFile,
    updateCase
  };
  return controller;
};
export default initCaseFiles;
