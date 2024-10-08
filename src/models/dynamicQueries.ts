export default {
	insertUsers: `
  INSERT INTO users (
    user_id,
    user_name,
    user_email,
    user_password
    )
  VALUES (@id, @name, @email, @password);
  `,

	insertSources: `
  INSERT INTO sources (
    src_id,
    src_name,
    src_is_debit,
    user_id
    )
  VALUES (@id, @name, @isDebit, @userId);
  `,

	insertAccounts: `
  INSERT INTO accounts (
    acc_id,
    acc_code,
    acc_name,
    user_id
    )
  VALUES (@id, @code, @name, @userId);
  `,

	insertRefs: `
  INSERT INTO refs (
    ref_id,
    ref_date,
    ref_date_offset,
    ref_memo,
    ref_amount,
    src_id
    )
  VALUES (@id, @date, @dateOffset, @memo, @amount, @srcId);
  `,

	insertEntries: `
  INSERT INTO entries (
    entry_id,
    entry_date,
    entry_type,
    entry_description,
    user_id
    )
  VALUES (@id, @date, @type, @description, @userId);
  `,

	insertLineItems: `
  INSERT INTO line_items (
    line_id,
    line_amount,
    acc_code,
    entry_id
    )
    VALUES ( @id, @amount, @accCode, @entryId );
  `,

	insertEntryRefs: `
  INSERT INTO entry_refs ( ref_id, entry_id ) VALUES ( @refId, @entryId );
  `,
};
